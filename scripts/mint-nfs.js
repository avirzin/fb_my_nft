const {
    FireblocksWeb3Provider,
    ApiBaseUrl,
    ChainId,
  } = require("@fireblocks/fireblocks-web3-provider");
  const { Web3 } = require("web3");
  const fs = require("fs");
  require("dotenv").config();
  
  
  const contractAddress = "0xAaBe82edBCd6eD66d6a5869ADE6679CcA3633465";
  const metadataCID = "QmYggKNg33hJchRYD9jn3E5E68shmXQeo3qHV3nFYVvU6g";
  
  const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
  
  const mintNFT = async (URI) => {
    const apiKey = process.env.FIREBLOCKS_API_KEY;
    const secretKey = fs.readFileSync(
      process.env.FIREBLOCKS_SECRET_KEY_PATH,
      "utf-8"
    );
  
    const eip1193Provider = new FireblocksWeb3Provider({
      chainId: ChainId.SEPOLIA,
      apiBaseUrl: ApiBaseUrl.Sandbox,
      privateKey: secretKey,
      apiKey: apiKey,
      vaultAccountIds: "0",
    });
  
    const web3 = new Web3(eip1193Provider);
    const myAddr = await web3.eth.getAccounts();
    const myContract = new web3.eth.Contract(contract.abi, contractAddress);
  
    try {
      const tx = await myContract.methods.mintNFT(myAddr[0], URI).send({
        from: myAddr[0],
      });
  
      console.log("Mint Transaction Hash:", tx.logs[0].transactionHash);
    } catch (e) {
      console.log("Error Caught in Catch Statement: ", e);
    }
  };
  
  mintNFT(`https://gateway.pinata.cloud/ipfs/${metadataCID}`);
  