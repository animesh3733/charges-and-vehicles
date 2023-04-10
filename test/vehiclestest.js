const {expect} = require('chai');
const nock = require('nock');
const vehicles = require('../vehicles.json');
const axios = require('axios');

const baseUrl = 'https://raw.githubusercontent.com';

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
    const response = await
    axios.get(`${baseUrl}/ppadmaprasadshenoy/charges-and-vehicles/main/vehicles.json`);
    expect(response.status).to.equal(200);
    expect(response.data).to.deep.equal(vehicles);
  });

  it('should return a vehicle by modelname', async () => {
    const modelname = 'Tesla Model 3';
    const response = await
    axios.get(`${baseUrl}/ppadmaprasadshenoy/charges-and-vehicles/main/vehicles.json`);
    const result = response.data.find((vehicle) => vehicle.modelname === modelname);
    expect(result).to.deep.equal(vehicles[0]);
  });

  it('should return empty array if no vehicles found with given connector type', async () => {
    const connectorType = 'unknown';
    const response = await
    axios.get(`${baseUrl}/ppadmaprasadshenoy/charges-and-vehicles/main/vehicles.json`);
    const result = response.data.filter((vehicle) => vehicle.connectorType.includes(connectorType));
    expect(result).to.be.an('array').that.is.empty;
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
