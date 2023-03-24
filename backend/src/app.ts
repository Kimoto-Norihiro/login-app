import express from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mysql from 'mysql';
import 'dotenv/config'
import cors from 'cors'

import { mysqlConfig } from '../config/mysql.config'
import { signInRouter } from './routes/signin'
import { signUpRouter } from './routes/signup'
import { usersRouter } from './routes/users'
import { myPageRouter } from './routes/mypage';

export const app = express();
const PORT = process.env.PORT || 8000

const con = mysql.createConnection({
  host: mysqlConfig.HOST,
  port: Number(mysqlConfig.PORT),
  user: mysqlConfig.USERNAME,
  password: mysqlConfig.PASSWORD,
  database: mysqlConfig.DATABASE
})

con.connect((err) => {
  if (err) throw err
  console.log('Connected')
})

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000']
}

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/signin', signInRouter)
app.use('/signup', signUpRouter)
app.use('/users', usersRouter)
app.use('/mypage', myPageRouter)

app.listen(PORT, () => {
	console.log(`listening at ${PORT}`)
})
