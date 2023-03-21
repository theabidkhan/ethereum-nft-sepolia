

//Ethereum Setup
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/9435dfd29bae48e686228e1a32bcc45b'));
// return new HDWalletProvider(MNEMONIC, "https://sepolia.infura.io/v3/9435dfd29bae48e686228e1a32bcc45b")
var myNFTJson = require("./build/contracts/MyNFT.json");

let contractAddress = '0x8c9fb0abd9B4f2a2c15928422269B6fE6ea38275';
let accountAddress = '0x9b01d1C27D14161d0D4F031501b8D487abe577d7';
let accPrivateKey = '26de3bb1985d2ccbc07234c6bed8489bc14d2110a8df84e11d9ed2af3a684a92';
let tokenURI = 'https://ipfs.io/ipfs/QmPLqb8T7XnRkbp4Vyp9xxB6voL4hdxNuqFPTsALr9RZgm';

async function myApp() {
    let myNFTContract = new web3.eth.Contract(myNFTJson.abi, contractAddress);

    console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`)

    //   let res=await myNFTContract.methods.mintNFT(accountAddress, 'https://ipfs.io/ipfs/QmPLqb8T7XnRkbp4Vyp9xxB6voL4hdxNuqFPTsALr9RZgm').send({ from: accountAddress, gas: "1000000" });

    let res = await myNFTContract.methods.mintNFT(accountAddress, tokenURI).encodeABI();
    //   let increment=await myNFTContract.methods.increment().encodeABI();
    var block = await web3.eth.getBlock("latest");
    var gasLimit = Math.round(block.gasLimit / block.transactions.length);
    var tx = { gas: gasLimit, to: contractAddress, data: res }
    web3.eth.accounts.signTransaction(tx, accPrivateKey).then(async signed => {
        await web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
    })

}

myApp();