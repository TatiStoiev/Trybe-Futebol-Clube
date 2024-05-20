import { Request, Router, Response } from 'express';
import MatchController from '../Controllers/Match.controller';

const matchController = new MatchController();

const MatchRouter = Router();

MatchRouter.get('/', (req: Request, res: Response) => matchController.findAllMatches(req, res));

export default MatchRouter;
