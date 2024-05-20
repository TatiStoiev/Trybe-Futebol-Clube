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
}
