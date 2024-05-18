import { Request, Router, Response } from 'express';
import UserController from '../Controllers/User.controller';
import Validations, { CustomRequest } from '../middlewares/validations';
import { TokenPayload } from '../types';

const userController = new UserController();

const UserRouter = Router();

UserRouter.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

UserRouter.get(
  '/role',
  Validations.validateToken,
  (req: CustomRequest, res: Response) => {
    const userRole = (req.user as TokenPayload).role;
    return res.status(200).json({ role: userRole });
  },
);

export default UserRouter;
