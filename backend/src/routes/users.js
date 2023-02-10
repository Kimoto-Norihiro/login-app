import { Router } from 'express';

export const usersRouter = Router();

/* GET users listing. */
usersRouter.get('/', function(req, res, next) {
  res.send('user');
});
