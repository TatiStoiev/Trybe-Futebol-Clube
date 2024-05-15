import { Request, Router, Response } from 'express';
import TeamController from '../Controllers/Team.controller';

const teamController = new TeamController();

const TeamRouter = Router();

TeamRouter.get('/', (req: Request, res: Response) => teamController.findAllTeams(req, res));
TeamRouter.get(
  '/:id',
  (req: Request, res: Response) => teamController.findTeamById(req, res),
);

export default TeamRouter;
