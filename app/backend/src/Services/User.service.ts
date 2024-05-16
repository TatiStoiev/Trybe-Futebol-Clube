import * as bcrypt from 'bcryptjs';
import { IUserModel } from '../Interfaces/User/IUserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILogin, IUser } from '../Interfaces/User/IUser';
import UserModel from '../database/models/users/UserModel';
import JWT from '../utils/JWT';
import IToken from '../Interfaces/User/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) {}

  public async findByEmail(email: string): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }
    return { status: 'SUCCESSFUL', data: user };
  }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken >> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user) {
      return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    }
    if (!bcrypt.compareSync(data.password, user.password)) {
      return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    }
    const { email } = user as IUser;
    const token = this.jwtService.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
