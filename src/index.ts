import * as CryptoJS from "crypto-js";
import { createNew } from "typescript";

class Block {
	static calculateBlockHash = (
		index: number,
		previousHash: string,
		timestap: number,
		data: string
	): string =>
		CryptoJS.SHA256(index + previousHash + timestap + data).toString();

	static validateStructure = (aBlock: Block): boolean =>
		typeof aBlock.index === "number" &&
		typeof aBlock.hash === "string" &&
		typeof aBlock.previousHash === "string" &&
		typeof aBlock.data === "string" &&
		typeof aBlock.timestap === "number";

	public index: number;
	public hash: string;
	public previousHash: string;
	public data: string;
	public timestap: number;

	constructor(
		index: number,
		hash: string,
		previousHash: string,
		data: string,
		timestap: number
	) {
		this.index = index;
		this.hash = hash;
		this.previousHash = previousHash;
		this.data = data;
		this.timestap = timestap;
	}
}

const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);

let blcokchain: [Block] = [genesisBlock];

const getBlockchain = (): Block[] => blcokchain;
const getLatestBlock = (): Block => blcokchain[blcokchain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data: string): Block => {
	const previousBlcok: Block = getLatestBlock();
	const newIndex: number = previousBlcok.index + 1;
	const nextTimestamp: number = getNewTimeStamp();
	const nextHash: string = Block.calculateBlockHash(
		newIndex,
		previousBlcok.hash,
		nextTimestamp,
		data
	);

	const newBlock: Block = new Block(
		newIndex,
		nextHash,
		previousBlcok.hash,
		data,
		nextTimestamp
	);
	addBlock(newBlock);

	return newBlock;
};

const getHashForBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestap, aBlock.data);

const isBlockValid = (
	candidateBlock: Block,
	previousBlcok: Block
): boolean => {
	if (!Block.validateStructure(candidateBlock)) {
		return false;
	} else if (previousBlcok.index + 1 !== candidateBlock.index) {
		return false;
	} else if (previousBlcok.hash !== candidateBlock.previousHash) {
		return false;
	} else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
		return false;
	} else {
		return true;
	}
};

const addBlock = (candidateBlock: Block): void => {
	if(isBlockValid(candidateBlock, getLatestBlock())) {
		blcokchain.push(candidateBlock);
	}
};

createNewBlock("Second Block");
createNewBlock("Third Block");
createNewBlock("Fourth Block");

console.log(blcokchain);

export { }