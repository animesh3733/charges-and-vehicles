const app = require('../app');
const {expect} = require('chai');
const nock = require('nock');
const charges = require('../chargers.json');
const vehicles = require('../vehicles.json');
// const assert = require('assert');
const http = require('http');

describe('Chargers and Vehicles API', () => {
  let server;

  before((done) => {
    server = app.listen(4000, () => {
      console.log('Server started');
      done();
    });
  });

  after((done) => {
    server.close(() => {
      console.log('Server stopped');
      done();
    });
  });

  describe('GET /chargers', () => {
    it('should return an array of chargers', (done) => {
      nock('http://localhost:4000')
          .get('/chargers')
          .reply(200, charges);

      http.get('http://localhost:4000/chargers', (res) => {
        expect(res.statusCode).to.equal(200);
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          expect(JSON.parse(body)).to.deep.equal(charges);
          done();
        });
      });
    }).timeout(5000);
  });

  describe('GET /vehicles', () => {
    it('should return an array of vehicles', (done) => {
      nock('http://localhost:4000')
          .get('/vehicles')
          .reply(200, vehicles);

      http.get('http://localhost:4000/vehicles', (res) => {
        expect(res.statusCode).to.equal(200);
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          expect(JSON.parse(body)).to.deep.equal(vehicles);
          done();
        });
      });
    }).timeout(5000);

    it('should return an array of vehicles', (done) => {
      nock('http://localhost:4000')
          .get('/vehicles/get-vehicles')
          .reply(200, vehicles);

      http.get('http://localhost:4000/vehicles/get-vehicles', (res) => {
        expect(res.statusCode).to.equal(200);
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          expect(JSON.parse(body)).to.deep.equal(vehicles);
          done();
        });
      });
    }).timeout(5000);
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
    expect(vehicles).to.be.an('array').that.is.not.empty;
    vehicles.forEach((vehicle) => {
      expect(vehicle).to.have.property('modelname');
      expect(vehicle.modelname).to.be.a('string').and.to.have.length.within(1, 50);
    });
  });
});
