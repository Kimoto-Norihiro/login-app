import { Router } from 'express';

export const indexRouter = Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.send('home');
});
