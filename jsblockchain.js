const SHA256 = require("crypto-js/sha256");

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
        this.chain = [this.createGenesisBlock()];
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

    checkBlockChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false
            }

            if(currentBlock.previousHash != previousBlock.hash){
                console.log(currentBlock.index)
                return false
            }
        }
        return true
    }
}

let block1 = new Block(1, "02/01/2020",{mybalance: 100});
let block2 = new Block(2, "03/01/2020",{mybalance: 50});

let myBlockChain = new BlockChain();
myBlockChain.addBlock(block1);
myBlockChain.addBlock(block2);

console.log(JSON.stringify(myBlockChain, null, 4));
console.log("valid:", myBlockChain.checkBlockChainValid())