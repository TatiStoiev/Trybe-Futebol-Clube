import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeams from '../database/models/teams/SequelizeTeams';
import { mockfindAll, mockFindById, mockTeamIdNotFound, mockTeam } from './mocks/TeamsMock';

import { app } from '../app';

import TeamService from '../Services/Team.service';

chai.use(chaiHttp);

const { expect } = chai;

const teamService = new TeamService();


describe('Testes para a rota Teams', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar status SUCCESSFUL e a lista de times', async function () {
    sinon.stub(SequelizeTeams, 'findAll').resolves(mockfindAll as any);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockfindAll);
  })

  it('Deve retornar status 200 e o time por id', async function () {
    sinon.stub(teamService, 'getById').resolves(mockFindById as any);

    const response = (await chai.request(app).get('/teams/1'));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockTeam)
  })

  it('Deve retornar status 404 se o id do time não for encontrado', async function () {

    sinon.stub(teamService, 'getById').resolves(mockTeamIdNotFound as any);

    const response = (await chai.request(app).get('/teams/999'));

    expect(response.status).to.be.equal(404);
  })
});
