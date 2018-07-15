import { expect } from 'chai';
import Trie from '../lib/Trie';
import Node from '../lib/Node';
import fs from 'fs';

var trie = new Trie();
require('locus')

describe('TRIE', () => {
  it('should exist', () => {
    expect(trie).to.be.an('object')
  });

  it('should be able to take in a word', () => {
    // eval(locus)
    trie.insert("hello");
    trie.count();
    expect(trie.wordCount).to.equal(1)
    
    trie.insert("world");
    trie.count();
    expect(trie.wordCount).to.equal(2)

    trie.insert("war");
    trie.count();
    expect(trie.wordCount).to.equal(3)

    // console.log(JSON.stringify(trie, null, 4))
  });

  it('should have a suggest method', () => {
    expect(trie.suggest).to.be.a('function');
  });

  it('should return an empty array if there are no words containing prefix', () => {
    trie.insert("cat");
    trie.insert("crazy");
    trie.insert("candy");

    let autoFill = trie.suggest('clam')

    expect(autoFill).to.deep.equal([])
    
    // trie.suggest('he');
    // => ['hello']
    
    // trie.insert("hellen");
    
    // trie.suggest("he");
    // => ["hello", "hellen"]
    
    // prefixTrie.suggest('w');
    // => ["world"]
  })
  
  it('should return an array of all the words containing the prefix', () => {
    
    expect(trie.suggest('he')).to.deep.equal(['hello'])
    expect(trie.suggest('c')).to.deep.equal(['cat', 'candy', 'crazy'])
    expect(trie.suggest('he')).to.deep.equal(['hello'])
    // eval(locus)
  });
  
  it('should have a populate method', () => {
    expect(trie.populate).to.be.a('function');
  });
  
  it('should be able to populate dictionary', () => {
    const text = "/usr/share/dict/words";
    const dictionary = fs.readFileSync(text).toString().trim().split('\n');
    
    trie.populate(dictionary)
    expect(trie.count()).to.equal(234361)
    expect(trie.suggest('worldf')).to.deep.equal(['worldful'])
    // console.log(JSON.stringify(trie, null, 4))
  })
  

});
