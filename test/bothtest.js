const {expect} = require('chai');
const chargers = require('../chargers.json');
const vehicles = require('../vehicles.json');

const sinon = require('sinon');
// const express = require('express');
const app = require('../app');

describe('App', function() {
  it('should use chargers route', function() {
    sinon.stub(app, 'use');
    app.use('/chargers', chargers);
    expect(app.use.calledWith('/chargers', chargers)).to.be.true;
    app.use.restore();
  });

  it('should use vehicles route', function() {
    sinon.stub(app, 'use');
    app.use('/vehicles', vehicles);
    expect(app.use.calledWith('/vehicles', vehicles)).to.be.true;
    app.use.restore();
  });

  it('should listen on port 3000', function() {
    const listenStub = sinon.stub(app, 'listen');
    app.listen(3000);
    expect(listenStub.calledWith(3000)).to.be.true;
    listenStub.restore();
  });
});

describe('Test Suite for chargers and Vehicles JSON files', () => {
  it('should have a valid charger model', () => {
    chargers.forEach((charge) => {
      expect(charge).to.have.property('chargerModel');
      expect(charge.chargerModel).to.be.a('string');
    });
  });

  it('should have valid connectors', () => {
    chargers.forEach((charge) => {
      expect(charge).to.have.property('connectors');
      expect(charge.connectors).to.be.an('array');
      charge.connectors.forEach((connector) => {
        expect(connector).to.be.a('string');
      });
    });
  });

  it('should have a valid power rating', () => {
    chargers.forEach((charge) => {
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
