import { expect } from 'chai';
import Trie from '../lib/Trie';
import fs from 'fs';
require('locus');

var trie = new Trie();

describe('TRIE', () => {
  it('should exist', () => {
    expect(trie).to.be.an('object');
  });

  it('should be able to take in a word', () => {
    trie.insert('hello');
    trie.count();
    expect(trie.wordCount).to.equal(1);

    trie.insert('world');
    trie.count();
    expect(trie.wordCount).to.equal(2);

    trie.insert('war');
    trie.count();
    expect(trie.wordCount).to.equal(3);
  });

  it('should have a suggest method', () => {
    expect(trie.suggest).to.be.a('function');
  });

  it('should return an empty array if there are no words containing prefix', () => {
    trie.insert('cat');
    trie.insert('crazy');
    trie.insert('candy');

    expect(trie.suggest('clam')).to.deep.equal([]);
  });

  it('should return an array of all the words containing the prefix', () => {
    expect(trie.suggest('he')).to.deep.equal(['hello']);
    expect(trie.suggest('c')).to.deep.equal(['cat', 'candy', 'crazy']);
    expect(trie.suggest('ca')).to.deep.equal(['cat', 'candy']);
  });

  it('should have a populate method', () => {
    expect(trie.populate).to.be.a('function');
  });

  it('should be able to populate dictionary', () => {
    const text = '/usr/share/dict/words';
    const dictionary = fs
      .readFileSync(text)
      .toString()
      .trim()
      .split('\n');

    trie.populate(dictionary);

    expect(trie.wordCount).to.equal(234361);
    expect(trie.suggest('world')).to.deep.equal([
      'worlded',
      'worldful',
      'worldish',
      'worldless',
      'worldlet',
      'worldlike',
      'worldlily',
      'worldliness',
      'worldling',
      'worldly',
      'worldmaker',
      'worldmaking',
      'worldproof',
      'worldquake',
      'worldward',
      'worldwards',
      'worldway',
      'worldy'
    ]);
    expect(trie.suggest('colore')).to.deep.equal([
      'colorectitis',
      'colorectostomy',
      'colored',
      'colorer'
    ]);
  });
});

// eval(locus);
