/* eslint-disable max-len */
// const app = require('../app');
const {expect} = require('chai');
const nock = require('nock');
// const assert = require('assert');
const charges = require('../chargers.json');
const vehicles = require('../vehicles.json');
const axios = require('axios');
// const app = require('../app.js');

const baseUrl = 'https://raw.githubusercontent.com';


// describe('Router Tests', function() {
//   it('should return a 200 status code for GET requests to /', async function() {
//     const response = await axios.get('https://raw.githubusercontent.com');
//     assert.strictEqual(response.status, 200);
//   });

//   // it('should return a 404 status code', () => {
//   //   const url = 'http://localhost:3000/invalid-url';
//   //   return axios.get(url)
//   //       .then(() => {
//   //         assert.fail('Expected request to fail');
//   //       })
//   //       .catch((error) => {
//   //         assert.equal(error.response.status, 404);
//   //       });
//   // });
// });

// describe('App', function() {
//   it('should respond with 404 for unknown routes', async function() {
//     try {
//       await axios.get('http://localhost:3000/unknown-route');
//       assert.fail('Expected 404 error');
//     } catch (err) {
//       assert.strictEqual(err.response.status, 404);
//     }
//   });
// });

describe('Vehicles JSON', () => {
  beforeEach(() => {
    nock(baseUrl)
        .get('/ppadmaprasadshenoy/charges-and-vehicles/main/vehicles.json')
        .reply(200, vehicles);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should return all vehicles', async () => {
    const response = await axios.get(`${baseUrl}/ppadmaprasadshenoy/charges-and-vehicles/main/vehicles.json`);
    expect(response.status).to.equal(200);
    expect(response.data).to.deep.equal(vehicles);
  });

  it('should return a vehicle by modelname', async () => {
    const modelname = 'Tesla Model 3';
    const response = await axios.get(`${baseUrl}/ppadmaprasadshenoy/charges-and-vehicles/main/vehicles.json`);
    const result = response.data.find((vehicle) => vehicle.modelname === modelname);
    expect(result).to.deep.equal(vehicles[0]);
  });

  it('should return empty array if no vehicles found with given connector type', async () => {
    const connectorType = 'unknown';
    const response = await axios.get(`${baseUrl}/ppadmaprasadshenoy/charges-and-vehicles/main/vehicles.json`);
    const result = response.data.filter((vehicle) => vehicle.connectorType.includes(connectorType));
    expect(result).to.be.an('array').that.is.empty;
  });
});

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
    const result = response.data.find((charge) => charge.chargerModel === chargerModel);
    expect(result).to.deep.equal(charges[0]);
  });

  it('should return an empty array if no chargers are found', async () => {
    const chargerModel = 'Non-existent Charger Model';
    const response = await axios.get(`${baseUrl}/ppadmaprasadshenoy/charges-and-vehicles/main/chargers.json`);
    const result = response.data.filter((charge) => charge.chargerModel === chargerModel);
    expect(result).to.be.an('array').that.is.empty;
  });

  it('should return chargers with the correct powerRating', async () => {
    const powerRating = '360 kW';
    const response = await axios.get(`${baseUrl}/ppadmaprasadshenoy/charges-and-vehicles/main/chargers.json`);
    const result = response.data.every((charge) => charge.powerRating === powerRating);
    expect(result).to.be.false;
  });

  it('should return chargers with the correct connectors', async () => {
    const connectors = ['Type 2'];
    const response = await axios.get(`${baseUrl}/ppadmaprasadshenoy/charges-and-vehicles/main/chargers.json`);
    const result = response.data.every((charge) => charge.connectors.includes(...connectors));
    expect(result).to.be.false;
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
});
