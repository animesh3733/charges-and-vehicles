/* eslint-disable max-len */
const {expect} = require('chai');
const nock = require('nock');
const axios = require('axios');
const charges = require('../chargers.json');

const baseUrl = 'https://raw.githubusercontent.com';

describe('Chargers JSON', () => {
  beforeEach(() => {
    nock('http://localhost:3000')
        .get('/chargers/get-chargers')
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
});
