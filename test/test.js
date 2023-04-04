const app = require('../app');
const {expect} = require('chai');
const nock = require('nock');
const charges = require('../chargers.json');
const vehicles = require('../vehicles.json');
const axios = require('axios');

describe('charges and Vehicles API', () => {
  let server;

  beforeEach((done) => {
    server = app.listen(4000, () => {
      done();
    });
  });

  afterEach((done) => {
    server.close(done);
  });

  describe('GET /charges', () => {
    it('should return an array of charges', async () => {
      nock('http://localhost:4000')
          .get('/get-charges')
          .reply(200, charges);

      const response = await axios.get('http://localhost:4000/get-charges');
      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal(charges);
    }).timeout(5000);
  });

  describe('GET /vehicles', () => {
    it('should return an array of vehicles', async () => {
      nock('http://localhost:4000')
          .get('/vehicles')
          .reply(200, vehicles);

      const response = await axios.get('http://localhost:4000/vehicles');
      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal(vehicles);
    }).timeout(5000);

    it('should return an array of vehicles', async () => {
      nock('http://localhost:4000')
          .get('/vehicles/get-vehicles')
          .reply(200, vehicles);

      const response = await axios.get('http://localhost:4000/vehicles/get-vehicles');
      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal(vehicles);
    }).timeout(5000);
  });
});

describe('Test Suite for charges and Vehicles JSON files', () => {
  it('should have a valid charger model', () => {
    charges.forEach((charge) => {
      expect(charge).to.have.property('chargerModel');
      expect(charge.chargerModel).to.be.a('string');
    });
  });

  it('should have valid connectors', () => {
    charges.forEach((charge) => {
      expect(charge).to.have.property('connectors');
      expect(charge.connectors).to.be.an('array');
      charge.connectors.forEach((connector) => {
        expect(connector).to.be.a('string');
      });
    });
  });

  it('should have a valid power rating', () => {
    charges.forEach((charge) => {
      expect(charge).to.have.property('powerRating');
      expect(charge.powerRating).to.be.a('string');
    });
  });

  it('should have a valid modelname', () => {
    vehicles.forEach((vehicle) => {
      expect(vehicle).to.have.property('modelname');
      expect(vehicle.modelname).to.be.a('string');
    });
  });

  it('should have valid connector type', () => {
    vehicles.forEach((vehicle) => {
      expect(vehicle).to.have.property('connectorType');
      expect(vehicle.connectorType).to.be.an('array');
      vehicle.connectorType.forEach((connector) => {
        expect(connector).to.be.a('string');
      });
    });
  });
});

describe('Vehicles JSON', () => {
  it('should have a valid model name', () => {
    expect(vehicles).to.be.an('array').that.is.not.empty;
    vehicles.forEach((vehicle) => {
      expect(vehicle).to.have.property('modelname');
      expect(vehicle.modelname).to.be.a('string').and.to.have.length.within(1, 50);
    });
  });
});
