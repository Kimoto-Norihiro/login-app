import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient()
export const signInRouter = Router();

/* GET users listing. */
signInRouter.get('/', function(req, res, next) {
  res.send('sign-in');
});

const loginUser = async () => {
  const user = await prisma.user.create({
    data: {
      name: 'nori',
      email: 'nori@example.com',
      password: 'password'
    }
  })
  console.log(user)
}
