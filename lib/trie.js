import Node from './Node';
require('locus');

class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
  }

  insert(word) {
    let letters = word.toLowerCase().split('');
    let currentNode = this.root.children;

    for (let i = 0; i < letters.length; i++) {
      if (!currentNode[letters[i]]) {
        currentNode[letters[i]] = new Node();
        if (i === letters.length - 1) {
          currentNode[letters[i]].word = true;
          this.wordCount++;
        }
        currentNode = currentNode[letters[i]].children;
      } else {
        currentNode = currentNode[letters[i]].children;
      }
    }
  }

  count() {
    return this.wordCount;
  }

  suggest(prefix) {
    let currNode = this.root;
    let suggestedWords = [];
    let prefixLowerCase = prefix.toLowerCase();
    let prefixLetters = [...prefixLowerCase];

    for (let letter of prefixLetters) {
      currNode = currNode.children[letter];
      if (!currNode) {
        return [];
      }
    }

    const getWords = (prefixString, node) => {
      for (let letter in node.children) {
        let newWord = prefixString + letter;

        if (node.children[letter].word === true) {
          suggestedWords.push(newWord);
        }
        getWords(newWord, node.children[letter]);
      }
    };

    getWords(prefix, currNode);
    return suggestedWords;
  }

  populate(words) {
    const newWords = [...words];

    newWords.forEach(word => {
      this.insert(word);
    });
  }
}

module.exports = Trie;
