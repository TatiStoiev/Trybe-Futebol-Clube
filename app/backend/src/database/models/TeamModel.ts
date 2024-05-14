import { ITeamModel } from '../../Interfaces/Teams/ITeamModel';
import ITeams from '../../Interfaces/Teams/ITeams';

export default class TeamModel implements ITeamModel {
  async findAll(): Promise<ITeams[]> {
    const response = await this.findAll();
    return response.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const response = await this.findById(id);
    if (response === null) return null;

    const { teamName }: ITeams = response;
    return { id, teamName };
  }
}
