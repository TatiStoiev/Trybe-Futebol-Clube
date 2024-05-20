import { Request, Router, Response } from 'express';
import MatchController from '../Controllers/Match.controller';

const matchController = new MatchController();

const MatchRouter = Router();

MatchRouter.get('/', (req: Request, res: Response) => matchController.findAllMatches(req, res));
MatchRouter.get('/?', (req: Request, res: Response) =>
  matchController.findMatchInProgress(req, res));

export default MatchRouter;
