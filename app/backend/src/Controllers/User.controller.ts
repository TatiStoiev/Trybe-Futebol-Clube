import { Request, Response } from 'express';
import UserService from '../Services/User.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async findUserByEmail(req: Request, res: Response) {
    const { email } = req.body;

    const user = await this.userService.findByEmail(email);

    if (user.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(user.status)).json(user.data);
    }
    res.status(200).json(user.data);
  }
}
