import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const isAuth = (req, res, next) => {
  try {
    console.log('success')
    const authHeader = req.get('Authorization')
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY);
    
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      result: false,
      message: 'AUTH ERROR'
    })
  }
  next();
}