import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
export const signInRouter = Router();

/* GET users listing. */
signInRouter.post('/', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })
    bcrypt.compare(password, user.password, (error, results) => {
      if (error) {
        return res.status(400).json({
          message: error.message,
          result: false
        })
      } else if (!results){
        return res.status(400).json({
          message: 'email or password is incorrect',
          result: false
        })
      } else {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          algorithm: 'HS256',
          expiresIn: '100s',
        })
        res.cookie('token', token, { httpOnly: true })
        return res.json({
          token,
          message: 'login',
          result: true
        })
      }
    })
  } catch {
    return res.status(400).json({
      message: 'email is incorrect',
      result: false
    })
  }
});

