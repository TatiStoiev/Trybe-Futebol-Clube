import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserService from '../Services/User.service';
import SequelizeUser from '../database/models/users/SequelizeUser';
import { user, userWithoutPassword, wrongPasswordUser, userRegistered, validLoginBody } from './mocks/UserMock';
import JWT from '../utils/JWT';
import Validations from '../middlewares/validations';

chai.use(chaiHttp);

const { expect } = chai;

const userService = new UserService();


describe('Testes para a rota Login', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar status 200 e token criado', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateLogin').returns();

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(validLoginBody);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  })
  })