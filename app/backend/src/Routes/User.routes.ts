import { Request, Router, Response } from 'express';
import UserController from '../Controllers/User.controller';
import Validations from '../middlewares/validations';

const userController = new UserController();

const UserRouter = Router();

UserRouter.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

export default UserRouter;
