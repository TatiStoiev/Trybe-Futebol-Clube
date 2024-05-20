import { IMatchModel } from '../../../Interfaces/Matches/IMatchModel';
import IMatch from '../../../Interfaces/Matches/IMatch';
import SequelizeMatch from './SequelizeMatch';
import { IMatchResults } from '../../../Interfaces/Matches/IMatchResults';
import SequelizeTeams from '../teams/SequelizeTeams';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const results = await this.model.findAll();
    return results;
  }

  async findById(id: IMatch['id']): Promise<IMatchResults | null> {
    const result = await this.model.findByPk(id, {
      include: [
        { model: SequelizeTeams, as: 'homeTeam' },
        { model: SequelizeTeams, as: 'awayTeam' },
      ],
    });
    if (result === null) return null;

    const { homeTeamGoals, awayTeamGoals } = result;
    return { homeTeamGoals, awayTeamGoals };
  }

  async findInProgress(inProgress: boolean): Promise<IMatchResults[]> {
    const results = await this.model.findAll({ where: { inProgress },
      attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });
    const matches = results.map((match) => ({
      homeTeamGoals: match.homeTeamGoals,
      awayTeamGoals: match.awayTeamGoals,
    }));
    return matches;
  }
}
