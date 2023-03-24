import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import 'dotenv/config'
import { isAuth } from '../middleware/isAuth.js';

const prisma = new PrismaClient()
export const usersRouter = Router();

usersRouter.use(isAuth)
usersRouter.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    return res.json({
      users,
    })
  } catch (err: any) {
    return res.status(500).json({
      message: err.message
    })
  }
});