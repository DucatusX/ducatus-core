'use strict';
const { ChainService } = require('../../ts_build/lib/chain');

describe('Chain DUCX', function() {
 
  it('should transform addresses to the db', function() {
    let x = {address: '0x01'};
    ChainService.addressToStorageTransform('ducx', 'abc', x);
    x.address.should.equal('0x01:abc');
  });

  it('should transform addresses from the db', function() {
    let x = {address: '0x01:dfg'};
    ChainService.addressFromStorageTransform('ducx', 'dfg', x);
    x.address.should.equal('0x01');
  });

});

