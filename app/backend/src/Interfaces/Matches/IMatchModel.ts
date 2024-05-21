import IMatch from './IMatch';
import IMatchCreateBody from './IMatchCreateBody';
import { IMatchResults } from './IMatchResults';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  findById(id: number): Promise<IMatchResults | null>,
  update(id: number, data: Partial<IMatch>): Promise<IMatchResults | null>,
  create(data: IMatchCreateBody): Promise <IMatch>,
}
