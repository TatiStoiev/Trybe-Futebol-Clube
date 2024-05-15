import { IUserModel } from '../Interfaces/User/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IUser from '../Interfaces/User/IUser';
import UserModel from '../database/models/users/UserModel';

export default class TeamService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {}

  public async findByEmail(email: string): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }
    return { status: 'SUCCESSFUL', data: user };
  }
}
