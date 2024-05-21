import { Request, Router, Response } from 'express';
import MatchController from '../Controllers/Match.controller';
import Validations from '../middlewares/validations';

const matchController = new MatchController();

const MatchRouter = Router();

MatchRouter.get('/', (req: Request, res: Response) => matchController.findAllMatches(req, res));
MatchRouter.get('/?', (req: Request, res: Response) =>
  matchController.findMatchInProgress(req, res));
MatchRouter.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

export default MatchRouter;
