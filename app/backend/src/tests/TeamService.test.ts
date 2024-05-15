import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import {teams} from './mocks/TeamsMock';
import SequelizeTeams from '../database/models/SequelizeTeams';

import { app } from '../app';

import { Response } from 'superagent';
import TeamService from '../Services/Team.service';

chai.use(chaiHttp);

const { expect } = chai;


const mockfindAll = {
  status: 'SUCCESSFUL', 
  data: teams
}


describe('Team Service tests', () => {
    afterEach(function () {
      sinon.restore();
    });

    describe('Testes para getAllTeams', async function () {

        it('Deve retornar status SUCCESSFUL e a lista de times', async function () {
          sinon.stub(SequelizeTeams, 'findAll').resolves(mockfindAll as any);

          const teamService = new TeamService();
          const teams = await teamService.getAllTeams();

          expect(teams.status).to.be.equal('SUCCESSFUL'); 
          expect(teams.data).to.be.deep.equal(teams.data);          
        });
    })  
});