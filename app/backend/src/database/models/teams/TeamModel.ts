import { ITeamModel } from '../../../Interfaces/Teams/ITeamModel';
import ITeams from '../../../Interfaces/Teams/ITeams';
import SequelizeTeams from './SequelizeTeams';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const response = await this.model.findAll();
    return response;
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const response = await this.model.findByPk(id);
    if (response === null) return null;

    const { teamName }: ITeams = response;
    return { id, teamName };
  }
}
