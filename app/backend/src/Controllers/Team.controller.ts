import { Request, Response } from 'express';
import TeamService from '../Services/Team.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async findAllTeams(req: Request, res: Response) {
    const teams = await this.teamService.getAllTeams();
    res.status(200).json(teams.data);
  }

  public async findTeamById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const team = await this.teamService.getById(id);

    if (team.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(team.status)).json(team.data);
    }
    res.status(200).json(team.data);
  }
}
