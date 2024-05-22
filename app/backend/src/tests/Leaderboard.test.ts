import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { teamsPerformance } from './mocks/LeaderboardMock';
import calculateTeamPerformance from '../utils/Leaderboard';

import * as matchesModule from '../utils/Leaderboard';
import * as teamsModule from '../utils/Leaderboard';

import { matchesData, teamsData } from './mocks/LeaderboardMock';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para leaderboard', () => {

describe('Testes para a rota GET/leaderboard/home', () => {
    afterEach(function () {
      sinon.restore();
    });
     
      it('Deve retornar status 200 e a lista de performance dos times', async function () {

        const response = await chai.request(app).get('/leaderboard/home');
    
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an('array');
  })
});

describe('Testes unitários' , () => {
    it('Teste para a calculateTeamPerformance deve retornar a performance dos times', async () => {
        const getAllMatchesStub = sinon.stub().resolves(matchesData);
      
          const getAllTeamsStub = sinon.stub().resolves(teamsData);
      
            const result = await calculateTeamPerformance();
      
            expect(result).to.be.an('array');
      
    })
})
})