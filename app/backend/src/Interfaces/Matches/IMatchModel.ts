import IMatch from './IMatch';
import { IMatchResults } from './IMatchResults';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  findById(id: number): Promise<IMatchResults | null>,
  update(id: number, data: Partial<IMatch>): Promise<IMatchResults | null>,
}
