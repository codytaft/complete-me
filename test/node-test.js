import { expect } from 'chai';
import Node from '../lib/Node';
require('locus');

describe('NODE', () => {
  let node = new Node();

  it('should exist', () => {
    expect(node).to.be.an('object');
  });

  it('should have a default value of word set to null', () => {
    expect(node.word).to.equal(false);
  });

  it('should have a default value of children to be an exmpty object', () => {
    expect(node.children).to.deep.equal({});
  });
});
