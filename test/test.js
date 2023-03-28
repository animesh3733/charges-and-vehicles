const assert = require('assert');
const { expect } = require('chai');
const mocha = require('mocha');

const charges = require('../chargers.json');
const vehicles = require('../vehicles.json');

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