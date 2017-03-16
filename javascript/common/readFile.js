const Future = require('fluture');
const futurize = require('futurize').futurize(Future);

const readFile = futurize(require('fs').readFile);
module.exports = readFile;


