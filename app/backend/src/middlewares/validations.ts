import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';
import { TokenPayload } from '../types';
import TeamService from '../Services/Team.service';

export interface CustomRequest extends Request {
  user?: TokenPayload;
}

const teamService = new TeamService();

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (email === '' || password === '') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = new RegExp([ // ajuda do chatGPT para resolver o lint do regex com muitas letras por linha
      '^[a-zA-Z0-9]+',
      '([._-]?[a-zA-Z0-9]+)*',
      '@[a-zA-Z0-9]+',
      '([.-]?[a-zA-Z0-9]+)*',
      '\\.[a-zA-Z]{2,}$',
    ].join(''));

    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateToken(req: CustomRequest, res: Response, next: NextFunction):
  Promise<Response | void> {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || authorizationHeader === '') {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = JWT.extractToken(authorizationHeader);

    if (!token) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    const validToken = await JWT.verify(token);
    req.user = validToken as TokenPayload;
    next();
  }

  static async validateTeams(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    const homeTeamExist = await teamService.getById(homeTeamId);
    console.log('home team exist:', homeTeamExist);
    if (homeTeamExist.status === 'NOT_FOUND') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const awayTeamExist = await teamService.getById(awayTeamId);
    if (awayTeamExist.status === 'NOT_FOUND') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}
