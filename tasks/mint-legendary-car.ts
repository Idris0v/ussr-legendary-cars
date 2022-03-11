import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

task('mintlegend', 'Mint nft')
    .addParam('receiver', 'token to mint to')
    .addParam('tokenuri', 'token uri')
    .setAction(async ({ receiver, tokenuri }, { ethers }) => {
        if (!process.env.NFT_ADDRESS) {
            throw new Error('process.env.NFT_ADDRESS is not provided');
        }

        const nft = await ethers.getContractAt(
            "LegendaryCars",
            process.env.NFT_ADDRESS
        );
        const tx = await nft.mint(receiver, tokenuri);
        await tx.wait();
    });