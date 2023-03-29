const express = require('express');
const {expect} = require('chai');
const axios = require('axios');
const app = express();
// const assert = require('assert');
// const mocha = require('mocha');

const charges = require('../chargers.json');
const vehicles = require('../vehicles.json');


describe('Chargers and Vehicles API', () => {
  let server;

  before((done) => {
    server = app.listen(3000, () => {
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
      const response = await axios.get('http://localhost:3000/chargers');
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an('array');
      expect(response.data.length).to.be.greaterThan(0);
      expect(response.data[0]).to.have.property('modelname');
      expect(response.data[0]).to.have.property('connectorType');
    });
  });

  describe('GET /vehicles', () => {
    it('should return an array of vehicles', async () => {
      const response = await axios.get('http://localhost:3000/vehicles');
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an('array');
      expect(response.data.length).to.be.greaterThan(0);
      expect(response.data[0]).to.have.property('make');
      expect(response.data[0]).to.have.property('model');
      expect(response.data[0]).to.have.property('year');
    });
  });
});


describe('Test Suite for Charges and Vehicles JSON files', () => {
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

  it('should have valid connector types', () => {
    vehicles.forEach((vehicle) => {
      expect(vehicle).to.have.property('connectorType');
      expect(vehicle.connectorType).to.be.an('array');
      expect(vehicle.connectorType).to.have.length.above(0);
      vehicle.connectorType.forEach((connector) => {
        expect(connector).to.be.a('string');
        expect(connector).to.match(
            /^(CCS1|CCS2|CHAdeMO|Type 2|Tesla Supercharger|Tesla Wall Connector|GBT)$/,
        );
      });
    });
  });

  it('should not have duplicate model names', () => {
    const allModelNames = [];
    vehicles.forEach((vehicle) => {
      expect(allModelNames).to.not.include(vehicle.modelname);
      allModelNames.push(vehicle.modelname);
    });
  });
  it('should have a unique charger model name for each charger', () => {
    const chargerModels = charges.map((charge) => charge.chargerModel);
    const uniqueModels = new Set(chargerModels);
    expect(uniqueModels.size).to.equal(charges.length);
  });

  it('should have connectors that are valid types', () => {
    const validConnectorTypes = ['CCS1', 'CCS2', 'CHAdeMO', 'Type 2',
      'Tesla Supercharger', 'GBT', 'Tesla Wall Connector'];
    charges.forEach((charge) => {
      expect(charge).to.have.property('connectors');
      expect(charge.connectors).to.be.an('array');
      charge.connectors.forEach((connector) => {
        expect(validConnectorTypes).to.include(connector);
      });
    });
  });

  it('should have a valid power rating', () => {
    charges.forEach((charge) => {
      expect(charge).to.have.property('powerRating');
      expect(charge.powerRating).to.match(/^\d+(\.\d+)?\s+kW$/);
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
        expect(['CCS1', 'CCS2', 'CHAdeMO', 'Type 2',
          'Tesla Supercharger', 'GBT', 'Tesla Wall Connector']).to.include(connector);
      });
    });
  });

  it('should have a unique modelname for each vehicle', () => {
    const vehicleModels = vehicles.map((vehicle) => vehicle.modelname);
    const uniqueModels = new Set(vehicleModels);
    expect(uniqueModels.size).to.equal(vehicles.length);
  });

  it('should have at least one connector type', () => {
    vehicles.forEach((vehicle) => {
      expect(vehicle).to.have.property('connectorType');
      expect(vehicle.connectorType).to.be.an('array');
      expect(vehicle.connectorType.length).to.be.at.least(1);
    });
  });
});
