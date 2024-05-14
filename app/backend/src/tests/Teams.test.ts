import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import {teams} from './mocks/TeamsMock'
import SequelizeTeams from '../database/models/SequelizeTeams';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


const mockfindAll = {
  status: 200, 
  data: teams
}

describe('Seu teste', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar status SUCCESSFUL e a lista de times', async function () {
    sinon.stub(SequelizeTeams, 'findAll').resolves(mockfindAll as any);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockfindAll);
  })

  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)mockfindAll
  // });
});
