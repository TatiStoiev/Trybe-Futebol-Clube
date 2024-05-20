import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../database/models/matches/MatchModel';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import IMatch from '../Interfaces/Matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel : IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
