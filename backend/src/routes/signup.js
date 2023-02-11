import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import bcrypt from 'bcrypt'

const saltRounds = 10
 
const prisma = new PrismaClient()
export const signUpRouter = Router();

/* GET users listing. */
signUpRouter.post('/', async (req, res, next) =>  {
  const { name, email, password } = req.body
  const encryptedPassword = bcrypt.hashSync(password, saltRounds)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: encryptedPassword
    }
  })
  res.json({user})
});