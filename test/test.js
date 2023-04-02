const request = require('supertest');
const app = require('../app');
const {expect} = require('chai');
const nock = require('nock');
const charges = require('../chargers.json');
const vehicles = require('../vehicles.json');
// const assert = require('assert');

describe('Chargers and Vehicles API', () => {
  let server;

  before((done) => {
    server = app.listen(4000, () => {
      console.log('Server started');
      done();
    });
  });

  after(() => {
    server.close(() => {
      console.log('Server stopped');
    });
  });

  describe('GET /chargers', () => {
    it('should return an array of chargers', async () => {
      nock('http://localhost:4000')
          .get('/chargers')
          .reply(200, charges);

      const res = await request(app).get('/chargers/get-chargers');
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(charges);
    });

    it('should handle errors when fetching JSON data from GitHub link', async () => {
      it('should handle errors when fetching JSON data from GitHub link (Chargers)', async () => {
        const errorMessage = 'Error fetching JSON data from GitHub link';
        const expectedResponse = {
          error: errorMessage,
        };

        nock('https://raw.githubusercontent.com')
            .get('/animesh3733/charges-and-vehicles/main/chargers.json')
            .replyWithError(errorMessage);

        const res = await request(app).get('/chargers');
        expect(res.status).to.equal(500);
        expect(res.body).to.deep.equal(expectedResponse);
      });
    });
  });

  describe('GET /vehicles', () => {
    it('should return an array of vehicles', async () => {
      nock('http://localhost:4000')
          .get('/vehicles')
          .reply(200, vehicles);

      const res = await request(app).get('/vehicles/get-vehicles');
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(vehicles);
    });

    it('should return an array of vehicles', async () => {
      nock('http://localhost:4000')
          .get('/vehicles/get-vehicles')
          .reply(200, vehicles);

      const res = await request(app).get('/vehicles/get-vehicles');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });

    it('should handle errors when fetching JSON data from GitHub link', async () => {
      it('should handle errors when fetching JSON data from GitHub link (Vehicles)', async () => {
        const errorMessage = 'Error fetching JSON data from GitHub link';
        const expectedResponse = {
          error: errorMessage,
        };

        nock('https://raw.githubusercontent.com')
            .get('/animesh3733/charges-and-vehicles/main/vehicles.json')
            .replyWithError(errorMessage);

        const res = await request(app).get('/vehicles');
        expect(res.status).to.equal(500);
        expect(res.body).to.deep.equal(expectedResponse);
      });
    });
  });
});

describe('Test Suite for Chargers and Vehicles JSON files', () => {
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
    vehicles.forEach((vehicle) => {
      expect(vehicle).to.have.property('modelname');
      expect(vehicle.modelname).to.be.a('string');
      expect(vehicle.modelname).to.have.length.within(1, 50);
    });
  });
});
