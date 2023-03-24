import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('success')
    const authHeader = req.get('Authorization')
    if (!authHeader) return
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY as Secret);
    
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      result: false,
      message: 'AUTH ERROR'
    })
  }
  next();
}