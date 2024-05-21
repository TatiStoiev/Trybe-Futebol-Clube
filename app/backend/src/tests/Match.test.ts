import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatch from '../database/models/matches/SequelizeMatch';

import { app } from '../app';

import MatchService from '../Services/Match.service';
import MatchController from '../Controllers/Match.controller';
import { mockfindAllMatches, matchesInProgress, finishedMatches, finishMatch, matchFinished, token, validUser, invalidUser, responseInProgressFalse } from './mocks/MatchMock';
import Validations from '../middlewares/validations';

chai.use(chaiHttp);

const { expect } = chai;

const matchService = new MatchService();
const matchController = new MatchController();


describe('Testes para a rota Match', () => {
  afterEach(function () {
    sinon.restore();
  });
  describe('Testes para a rota GET/matches', ()=> {

  it('Deve retornar status SUCCESSFUL e a lista de partidas', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(mockfindAllMatches as any);
    sinon.stub(jwt, 'verify').callsFake(() => validUser)

    const response = await chai.request(app).get('/matches')
    .set('authorization', `Bearer ${token}`);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockfindAllMatches);
  })
})

  it('Deve retornar status SUCCESSFUL e a lista de partidas em progresso se a query inProgress for true', async function () {
    sinon.stub(matchService, 'getInProgressMatches').resolves(matchesInProgress as any);
    sinon.stub(jwt, 'verify').callsFake(() => validUser)

    const response = await chai.request(app).get('/matches')
    .query({ inProgress: 'true' })
    .set('authorization', `Bearer ${token}`);

    expect(response.status).to.be.equal(200);
    // expect(response.body).to.be.deep.equal(matchesInProgress);
  })

  it('Deve retornar status SUCCESSFUL e a lista de partidas finalizadas se a query inProgress for false', async function () {
    sinon.stub(jwt, 'verify').callsFake(() => validUser)
    sinon.stub(matchController, 'findAllMatches')
    .resolves(responseInProgressFalse as any);

    const response = await chai.request(app).get('/matches')
    .query({ inProgress: 'false' })
    .set('authorization', `Bearer ${token}`);

    expect(response.status).to.be.equal(200);
    // expect(response.body).to.be.deep.equal(finishedMatches);
  })

describe('Teste para a rota PATCH/matches/:id/finish', () => {

  it('Deve retornar status 401 e a mensagem "Token not found" ao tentar finalizar uma partida sem o token', async function () {
    sinon.stub(Validations, 'validateToken').callsFake(invalidUser as any)
    sinon.stub(matchService, 'updateMatch').resolves(matchFinished as any);

    const response = await chai.request(app).patch('/matches/1/finish');

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.equal('Token not found');
  })

  it('Deve retornar status 200 e a mensagem "Finished" ao finalizar uma partida', async function () {
 
    sinon.stub(jwt, 'verify').callsFake(() => validUser)
    sinon.stub(matchService, 'updateMatch').resolves(matchFinished as any);

    const response = await chai.request(app).patch('/matches/1/finish')
    .send()
    .set('authorization', `Bearer ${token}`);

    expect(response.status).to.be.equal(200);
    expect(response.body.message).to.equal('Finished');
  })
})
});