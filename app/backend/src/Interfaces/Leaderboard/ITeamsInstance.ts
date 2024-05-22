import { Model } from 'sequelize';
import ITeams from '../Teams/ITeams';

export interface ITeamsInstance extends Model<ITeams>, ITeams {}
