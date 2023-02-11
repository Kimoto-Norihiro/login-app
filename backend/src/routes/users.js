import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient()
export const usersRouter = Router();

/* GET users listing. */
usersRouter.get('/', async (req, res, next) => {
  const users = await prisma.user.findMany()
  return res.json({users})
});