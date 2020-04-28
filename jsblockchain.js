const SHA256 = requires("crypto-js/sha256");

class Block {
    constructor (index, timestamp, data, previousHash=''){
       this.index = index;
       this.timestamp = timestamp;
       this.data = data;
       this.previousHash = previousHash;
       this.hash = this.calculateHash;
    }

    calculateHash(){
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)).toString()
    }
}

// When a new blockchain is created a genesis block is made
class BlockChain {
    constructor(){
        // first variable will be genesis block
        this.chain = [this.createGenesisBlock];
    }

    createGenesisBlock(){
        return new Block(0,"01/01/2020", "This is the genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}