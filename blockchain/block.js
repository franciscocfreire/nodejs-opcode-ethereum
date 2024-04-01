const { GENESIS_DATA } = require('../config');


const HASH_LENGTH = 64;

const MAX_HASH_VALUE = parseInt("f".repeat(HASH_LENGTH), 16);

class Block {
    constructor({ blockHeaders }) {
        this.blockHeaders = blockHeaders;
    }


    static calculateBlockTargetHash({ lastBlock }) {
        return (MAX_HASH_VALUE / lastBlock.blockHeaders.difficulty).toString(16)
    }


    static mineBlock({ lastBlock, beneficiary }) {
        

    }

    static genesis() {
        return new Block(GENESIS_DATA);
    }
}

module.exports = Block;