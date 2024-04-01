const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()]
    }
}

const blockchain = new Blockchain();

console.log(JSON.stringify(blockchain))