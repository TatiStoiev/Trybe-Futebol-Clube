import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../Services/Match.service';
import IMatchCreateBody from '../Interfaces/Matches/IMatchCreateBody';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async findAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const inProgressMatches = await this.matchService.getInProgressMatches(true);
      return res.status(mapStatusHTTP(inProgressMatches.status)).json(inProgressMatches.data);
    }

    if (inProgress === 'false') {
      const inProgressMatches = await this.matchService.getInProgressMatches(false);
      return res.status(mapStatusHTTP(inProgressMatches.status)).json(inProgressMatches.data);
    }

    const allMatches = await this.matchService.getAllMatches();
    return res.status(mapStatusHTTP(allMatches.status)).json(allMatches.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;

    const updatedMatch = await this.matchService.updateMatch(id, data);
    return res.status(mapStatusHTTP(updatedMatch.status)).json(updatedMatch.data);
  }

  public async updateForFinishedMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = { inProgress: false };

    await this.matchService.updateMatch(id, data);
    return res.status(200).json({ message: 'Finished' });
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    const data: IMatchCreateBody = { homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true };

    const createdMatch = await this.matchService.createMatch(data);

    return res.status(201).json(createdMatch.data);
  }
}
