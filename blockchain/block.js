const { GENESIS_DATA } = require('../config');
const { keccakHash } = require('./utils');

const HASH_LENGTH = 64;

const MAX_HASH_VALUE = parseInt("f".repeat(HASH_LENGTH), 16);
const MAX_NONCE_VALUE = 2 ** 64;

class Block {
    constructor({ blockHeaders }) {
        this.blockHeaders = blockHeaders;
    }


    static calculateBlockTargetHash({ lastBlock }) {

        const value = (MAX_HASH_VALUE / lastBlock.blockHeaders.difficulty).toString(16);

        if (value.length > HASH_LENGTH) {
            return 'f'.repeat(HASH_LENGTH);
        }

        return value.padStart(HASH_LENGTH, '0');

    }


    static mineBlock({ lastBlock, beneficiary }) {
        const target = Block.calculateBlockTargetHash({ lastBlock });
        let timestamp, truncatedBlockheaders, header, nonce;

        timestamp = Date.now();

        truncatedBlockheaders = {
            parentHash: keccakHash(lastBlock.blockHeaders),
            beneficiary,
            difficulty: lastBlock.blockHeaders.number + 1,
            timestamp
        }

        header = keccakHash(truncatedBlockheaders);
        nonce = Math.floor(Math.random() * MAX_NONCE_VALUE);
        const underTargetHash = keccakHash(header + nonce);
        console.log('undertargetHash:', underTargetHash);
        console.log('target:', target);
        

        if (underTargetHash < target) {
            return new this({ blockHeaders: { ...truncatedBlockheaders, nonce } })
        }

    }

    static genesis() {
        return new Block(GENESIS_DATA);
    }
}


module.exports = Block;

const block = Block.mineBlock({
    lastBlock: Block.genesis(),
    beneficiary: 'foo'

})

console.log('block', block)