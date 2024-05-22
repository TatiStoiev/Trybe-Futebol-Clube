import { Model } from 'sequelize';
import IMatch from '../Matches/IMatch';

export interface IMatchInstance extends Model<IMatch>, IMatch {}
