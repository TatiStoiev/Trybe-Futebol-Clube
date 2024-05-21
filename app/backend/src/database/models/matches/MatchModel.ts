import { IMatchModel } from '../../../Interfaces/Matches/IMatchModel';
import IMatch from '../../../Interfaces/Matches/IMatch';
import SequelizeMatch from './SequelizeMatch';
import { IMatchResults } from '../../../Interfaces/Matches/IMatchResults';
import SequelizeTeams from '../teams/SequelizeTeams';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const results = await this.model.findAll({
      include: [
        { model: SequelizeTeams,
          as: 'homeTeam',
          attributes: {
            exclude: ['id'],
          } },
        { model: SequelizeTeams,
          as: 'awayTeam',
          attributes: {
            exclude: ['id'],
          } },
      ],
    });
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

  async update(id: IMatch['id'], data: Partial<IMatch>): Promise<IMatchResults | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;
    const match = this.findById(id);
    return match;
  }
}
