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