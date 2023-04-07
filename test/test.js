const app = require('../app');
const {expect} = require('chai');
const nock = require('nock');
const charges = require('../chargers.json');
const vehicles = require('../vehicles.json');
const axios = require('axios');

const baseUrl = 'https://raw.githubusercontent.com';

describe('Chargers JSON', () => {
  beforeEach(() => {
    nock(baseUrl)
      .get('/ppadmaprasadshenoy/charges-and-vehicles/main/chargers.json')
      .reply(200, charges);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should return all chargers', async () => {
    const response = await axios.get(`${baseUrl}/ppadmaprasadshenoy/charges-and-vehicles/main/chargers.json`);
    expect(response.status).to.equal(200);
    expect(response.data).to.deep.equal(charges);
  });

  it('should return a charger by chargerModel', async () => {
    const chargerModel = 'ABB Terra 360 - CCS';
    const response = await axios.get(`${baseUrl}/ppadmaprasadshenoy/charges-and-vehicles/main/chargers.json`);
    const result = response.data.find(charge => charge.chargerModel === chargerModel);
    expect(result).to.deep.equal(charges[0]);
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