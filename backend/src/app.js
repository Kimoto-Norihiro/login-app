import express from 'express'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mysql from 'mysql';
import 'dotenv/config'
import cors from 'cors'

import { mysqlConfig } from '../config/mysql.config.js'
import { signInRouter } from './routes/signin.js'
import { signUpRouter } from './routes/signup.js'
import { usersRouter } from './routes/users.js'
import { myPageRouter } from './routes/mypage.js';
import { isAuth } from './middleware/isAuth.js';

export const app = express();
// var debug = require('debug')('backend:server');
// var http = require('http');
const PORT = process.env.PORT || 8000

const con = mysql.createConnection({
  host: mysqlConfig.HOST,
  port: mysqlConfig.PORT,
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
