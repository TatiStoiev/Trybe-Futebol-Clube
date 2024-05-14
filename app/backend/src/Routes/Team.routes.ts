import { Request, Router, Response } from 'express';
import TeamController from '../Controllers/Team.controller';

const teamController = new TeamController();

const TeamRouter = Router();

TeamRouter.get('/teams', (req: Request, res: Response) => teamController.findAllTeams(req, res));
TeamRouter.get('/teams/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default TeamRouter;
