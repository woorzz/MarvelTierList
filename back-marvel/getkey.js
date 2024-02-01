const md5 = require('js-md5');
const dotenv = require('dotenv');

dotenv.config();


const ts = "1";
const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

const hash = md5.create();
hash.update(ts + privateKey + publicKey);
hash.hex();
const hashString = hash.hex();
console.log(hashString);