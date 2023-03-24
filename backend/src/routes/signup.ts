import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import bcrypt from 'bcrypt'

const saltRounds = 10
 
const prisma = new PrismaClient()
export const signUpRouter = Router();

/* GET users listing. */
signUpRouter.post('/', async (req, res) =>  {
  const { name, email, password } = req.body
  const encryptedPassword = bcrypt.hashSync(password, saltRounds)
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword
      }
    })
    return res.json({result: true})
  } catch {
    return res.status(400).json({
      result: false,
      message: 'same email is exist'
    })
  }
});