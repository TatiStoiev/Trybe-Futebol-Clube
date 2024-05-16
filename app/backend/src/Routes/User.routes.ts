import { Request, Router, Response } from 'express';
import UserController from '../Controllers/User.controller';

const userController = new UserController();

const UserRouter = Router();

UserRouter.get('/', (req: Request, res: Response) => userController.findUserByEmail(req, res));

export default UserRouter;
