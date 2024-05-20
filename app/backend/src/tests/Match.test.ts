import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatch from '../database/models/matches/SequelizeMatch';

import { app } from '../app';

import MatchService from '../Services/Match.service';
import { mockfindAllMatches } from './mocks/MatchMock';

chai.use(chaiHttp);

const { expect } = chai;

const matchService = new MatchService();


describe('Testes para a rota Match', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar status SUCCESSFUL e a lista de partidas', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(mockfindAllMatches as any);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockfindAllMatches);
  })
});