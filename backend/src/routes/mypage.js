import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { isAuth } from '../middleware/isAuth.js';

const prisma = new PrismaClient()
export const myPageRouter = Router();

myPageRouter.use(isAuth)
myPageRouter.get('/', async (req, res) => {
  try {
    const bearToken = req.headers["authorization"];
    const bearer = bearToken.split(" ");
    const token = bearer[1];
    const buffer = new Buffer.from(token.split('.')[1], 'base64')
    const payload = JSON.parse(buffer.toString('ascii'))
    const { id } = payload
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return res.json({
      user,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
})