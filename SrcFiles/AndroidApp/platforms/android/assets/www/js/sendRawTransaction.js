/* jshint esversion: 6 */
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

// connect to Infura node
const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v61hsMvKfFW08T9q4Msu'));

// the address that will send the test transaction
const addressFrom = '0x14459BEDE031d10a5Ab31b6a14D01e151Fac6cAC';
const privKey = '8dbac216bcbbcc319b459e1a0535e807a0733b0c39919d1fb0331f8891046e66';

// the destination address
const addressTo = '0x4385F93020615f9792308f882FB1C5aBC13bD68f';

// Signs the given transaction data and sends it. Abstracts some of the details
// of buffering and serializing the transaction for web3.
function sendSigned(txData, cb) {
  const privateKey = new Buffer(config.privKey, 'hex');
  const transaction = new Tx(txData);
  transaction.sign(privateKey);
  const serializedTx = transaction.serialize().toString('hex');
  web3.eth.sendSignedTransaction('0x' + serializedTx, cb);
}

function createTransaction(inputData){
var transaction;
var str = web3.toHex(inputData);
// get the number of transactions sent so far so we can create a fresh nonce
web3.eth.getTransactionCount(addressFrom).then(txCount => {

  // construct the transaction data
  const txData = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(25000),
    gasPrice: web3.utils.toHex(1e9), // 10 Gwei
    to: addressTo,
    from: addressFrom,
    value: 0,
    data: str

  };

  // fire away!
  sendSigned(txData, function(err, result) {
    if (err) return console.log('error', err);
    console.log('sent', result);
    transaction = result;

  });

});
return transaction;
}
