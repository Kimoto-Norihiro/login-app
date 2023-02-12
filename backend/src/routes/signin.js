import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
export const signInRouter = Router();

/* GET users listing. */
signInRouter.post('/', async (req, res, next) => {
  const { email, password } = req.body
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })
  bcrypt.compare(password, user.password, (error, results) => {
    if (error) {
      console.log('error')
      return res.status(400).json({
        error: error.message,
      })
    } else if (!results){
      console.log('no result')
      console.log(results)
      res.json({
        message: 'password is incorrect'
      })
    } else {
      console.log('token')
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
      res.json({token})
    }
  })
});