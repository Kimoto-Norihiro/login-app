import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const prisma = new PrismaClient()
export const usersRouter = Router();

/* GET users listing. */
usersRouter.get('/', async (req, res, next) => {
  const bearToken = req.headers["authorization"];
  const bearer = bearToken.split(" ");
  const token = bearer[1];

  jwt.verify(token, process.env.SECRET_KEY, async (error, user) => {
    if (error) {
      return res.sendStatus(403);
    } else {
      const users = await prisma.user.findMany()
      return res.json({
        users,
      })
    }
  })
});