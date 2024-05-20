import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../database/models/matches/MatchModel';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import IMatch from '../Interfaces/Matches/IMatch';
import { IMatchResults } from '../Interfaces/Matches/IMatchResults';

export default class MatchService {
  constructor(
    private matchModel : IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getInProgressMatches(inProgress: boolean):
  Promise<ServiceResponse<IMatchResults[]>> {
    const matches = await this.matchModel.findAll();
    const matchInProgress = matches.filter((match) => match.inProgress === inProgress);
    return { status: 'SUCCESSFUL', data: matchInProgress };
  }
}
