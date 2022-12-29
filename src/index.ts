import crypto from "crypto"

/**
 * @argument hash - Hash value of block
 * @argument prevHash - Previous block
 * @argument height - Total number of blocks
 * @argument data - Protected data
 */
interface BlockShape {
    hash: string
    prevHash: string
    height: number
    data: string
}

class Block implements BlockShape {
    public hash: string
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        this.hash = Block.hashFn(prevHash, height, data)
    }
    /**
     * Calculate Hash
     * @param {string} prevHash
     * @param {number} height
     * @param {string} data
     * @returns {string} hash value
     */
    static hashFn(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`
        return crypto.createHash("sha256").update(toHash).digest("hex")
        
    } // static => 인스턴스가 생성되지 않아도 호출 가능한 함수
}

class Blockchain {
    private blocks: Block[]
    constructor() {
        this.blocks = []
    }
    private getPrevHash() {
        if(this.blocks.length === 0) return ""
        return this.blocks[this.blocks.length - 1].hash
    }
    public addBlock(data: string) {
        const newBlock = new Block(
            this.getPrevHash(), 
            this.blocks.length + 1, // 블럭이 쌓인 갯수, 블럭의 층수
            data
        )
        this.blocks.push(newBlock)
    }
    public getBlock() {
        return this.blocks
    }
}

const blockchain = new Blockchain();

blockchain.addBlock("first data")
blockchain.addBlock("second data")
blockchain.addBlock("third data")

// 아래 코드느 보안상 매우 큰 문제가 있는데
// 누구든지 블록체인 생성 절차를 거치지 않고 새로운 블럭을 추가할 수 있다는 것이다. 
blockchain.getBlock().push(new Block("asdasd", 123123, "hacked"))

console.log(blockchain.getBlock())