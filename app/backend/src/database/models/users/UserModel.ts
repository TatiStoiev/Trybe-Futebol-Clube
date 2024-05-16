import { IUser } from '../../../Interfaces/User/IUser';
import { IUserModel } from '../../../Interfaces/User/IUserModel';
import SequelizeUser from './SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const response = await this.model.findOne({ where: { email } });
    if (response === null) return null;

    const { id, username, role, password }: IUser = response;
    return { id, username, role, email, password };
  }
}
