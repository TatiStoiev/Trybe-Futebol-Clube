import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../Services/Match.service';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async findAllMatches(req: Request, res: Response) {
    const allMatches = await this.matchService.getAllMatches();
    return res.status(mapStatusHTTP(allMatches.status)).json(allMatches.data);
  }

  public async findMatchInProgress(req: Request, res: Response) {
    const InProgress = req.query.inProgress;

    if (InProgress === 'true') {
      const inProgressMatches = await this.matchService.getInProgressMatches(true);
      return res.status(mapStatusHTTP(inProgressMatches.status)).json(inProgressMatches.data);
    }

    if (InProgress === 'false') {
      const inProgressMatches = await this.matchService.getInProgressMatches(false);
      return res.status(mapStatusHTTP(inProgressMatches.status)).json(inProgressMatches.data);
    }
  }

  public async updateMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const updatedMatch = await this.matchService.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return res.status(mapStatusHTTP(updatedMatch.status)).json(updatedMatch.data);
  }
}
