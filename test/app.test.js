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
