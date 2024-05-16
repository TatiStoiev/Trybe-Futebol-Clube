import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserService from '../Services/User.service';
import SequelizeUser from '../database/models/users/SequelizeUser';
import { userInvalidPasswordFormat, userRegistered, validLoginBody } from './mocks/UserMock';
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
  it('Deve retornar status 400 e a mensagem "All fields must be filled" se os campos de email e senha não forem informados', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .send({});

    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  })
  it('Deve retornar status 401 e a mensagem "Invalid email or password" se o formato da senha estiver incorreto', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .send(userInvalidPasswordFormat);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  })
  it('Deve retornar status 404 e a mensagem "User not found", se o usuário não for encontrado', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(validLoginBody);
    expect(status).to.equal(404);
    expect(body).to.be.deep.equal({ message: 'User not found' });
  })
  })