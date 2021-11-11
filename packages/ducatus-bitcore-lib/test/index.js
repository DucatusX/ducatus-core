"use strict";

var should = require("chai").should();
var ducatuscore = require("../");

describe('#versionGuard', function() {
  it('global._ducatuscore should be defined', function() {
    should.equal(global._ducatuscore, ducatuscore.version);
  });

  it('throw an error if version is already defined', function() {
    (function() {
      ducatuscore.versionGuard('version');
    }).should.throw('More than one instance of @ducatus/bitcore-lib found. Please make sure to require @ducatus/bitcore-lib and check that submodules do not also include their own @ducatus/bitcore-lib dependency.');
  });
});
