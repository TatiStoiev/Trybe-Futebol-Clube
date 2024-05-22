import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';

import { app } from '../app';

import UserService from '../Services/User.service';
import SequelizeUser from '../database/models/users/SequelizeUser';
import { returnUser, userInvalidPasswordFormat, userRegistered, validLoginBody, WithoutEmailUser, WithoutPasswordlUser, invalidEmailFormat, tokenPayload } from './mocks/UserMock';
import JWT from '../utils/JWT';
import Validations from '../middlewares/validations';
import UserController from '../Controllers/User.controller';

chai.use(chaiHttp);

const { expect } = chai;

const userService = new UserService();


describe('Testes para Login', () => {
  afterEach(function () {
    sinon.restore();
  });

  describe('Testes para a rota POST /login', async function() {

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

  it('Deve retornar status 400 e a mensagem "All fields must be filled" se o campo de email não for informados', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .send(WithoutEmailUser);

    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  })

  it('Deve retornar status 400 e a mensagem "All fields must be filled" se o campo de password não for informados', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .send(WithoutPasswordlUser);

    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  })

  it('Deve retornar status 401 e a mensagem "Invalid email or password" se o formato da senha estiver incorreto', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .send(userInvalidPasswordFormat);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  })

  it('Deve retornar status 401 e a mensagem "Invalid email or password" se o formato do email estiver incorreto', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .send(invalidEmailFormat);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  })

  it('Deve retornar status 401 e a mensagem "Invalid email or password", se o usuário não for encontrado', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(validLoginBody);
    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  })
  })

  describe('Testes para a rota GET /login/role', async function() {
    it('Deve retornar a role do usuário quando um token válido é passado', async function() {
      
      const token = JWT.sign(tokenPayload);
  
      const response = await chai.request(app)
        .get('/login/role')
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal({ role: 'user' });
    });

  });

  it('Deve retornar status 401 e mensagem "Token not found" quando o token não é passado', async function() {
    const response = await chai.request(app)
      .get('/login/role');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message', 'Token not found');
  });

  describe('Testes unitários', () => {
    const req = {} as Request;
    const res = {} as Response;
  
    it('Teste para findUserById no controller', async function() {
      req.body = {    
        email: 'billyjoe@email.com',
        password: 'JustBillie'
      }  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const userServiceMock = {
        findByEmail: sinon.stub().resolves({ status: 'SUCCESSFUL', data: returnUser})
      };

      const mapStatusHTTPStub = sinon.stub().callsFake((status) => 'SUCCESSFUL');
    
      const userController = new UserController(userServiceMock as any);

      await userController.findUserByEmail(req as Request, res as Response);

      expect(userServiceMock.findByEmail.calledOnceWith('billyjoe@email.com')).to.be.true;    
  })
});

it('Teste para findUserById na service', async function() {

  const findByEmailStub = sinon.stub().resolves(null);

  const userService = new UserService({ findByEmail: findByEmailStub });

  const email = 'test@example.com';
  const result = await userService.findByEmail(email);

   expect(findByEmailStub.calledOnceWith(email)).to.be.true;

  expect(result).to.deep.equal({ status: 'NOT_FOUND', data: { message: 'User not found' } });


});
});