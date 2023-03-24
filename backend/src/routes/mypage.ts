import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { isAuth } from '../middleware/isAuth.js';

const prisma = new PrismaClient()
export const myPageRouter = Router();

myPageRouter.use(isAuth)
myPageRouter.get('/', async (req, res) => {
  try {
    const bearToken = req.headers["authorization"];
    console.log(bearToken)
    if (!bearToken) return
    const bearer = bearToken.split(" ");
    const token = bearer[1];
    const buffer = Buffer.from(token.split('.')[1], 'base64')
    const payload = JSON.parse(buffer.toString('ascii'))
    const { id } = payload
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return res.json({
      result: true,
      message: 'success',
      user,
    })
  } catch (err: any) {
    return res.status(500).json({
      result: false,
      message: err.message
    })
  }
})