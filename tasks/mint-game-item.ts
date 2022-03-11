import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

task('mintgameitem', 'Mint erc1155')
    .addParam('receiver', 'token to mint to')
    .addParam('tokenid', 'token Item')
    .addParam('amount', 'tokens amount')
    .setAction(async ({ receiver, tokenid, amount }, { ethers }) => {
        if (!process.env.GAME_ITEMS_ADDRESS) {
            throw new Error('process.env.GAME_ITEMS_ADDRESS is not provided');
        }

        const gameItems = await ethers.getContractAt(
            "GameItems",
            process.env.GAME_ITEMS_ADDRESS
        );
        const tx = await gameItems.mint(receiver, tokenid, amount);
        await tx.wait();
    });