import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../database/models/matches/MatchModel';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import IMatch from '../Interfaces/Matches/IMatch';
import { IMatchResults } from '../Interfaces/Matches/IMatchResults';
import IMatchCreateBody from '../Interfaces/Matches/IMatchCreateBody';

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

  public async updateMatch(id: number, data: Partial<IMatch>):
  Promise<ServiceResponse<IMatchResults>> {
    const updatedMatch = await this.matchModel.update(id, data);
    if (updatedMatch === null) {
      return { status: 'INVALID_DATA', data: { message: 'Invalid data' } };
    }
    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  public async createMatch(data: IMatchCreateBody): Promise<ServiceResponse<IMatchResults>> {
    const createdMatch = await this.matchModel.create(data);
    return { status: 'SUCCESSFUL', data: createdMatch };
  }
}
