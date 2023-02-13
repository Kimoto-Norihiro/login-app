import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const prisma = new PrismaClient()
export const usersRouter = Router();

/* GET users listing. */
usersRouter.get('/', async (req, res) => {
  const bearToken = req.headers["authorization"];
  const bearer = bearToken.split(" ");
  const token = bearer[1];

  jwt.verify(token, process.env.SECRET_KEY, async (error) => {
    if (error) {
      return res.status(500).json({
        message: 'token is invalid'
      })
    } else {
      try {
        const users = await prisma.user.findMany()
        return res.json({
          users,
        })
      } catch (err) {
        return res.status(500).json({
          message: err.message
        })
      }
    }
  })
});