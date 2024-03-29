const fs = require("fs");

const generateKey = (key, algorithm) => {
  fs.writeFileSync(`${__dirname}/key.json`, JSON.stringify({ key, algorithm }));
};

module.exports.generateKey = generateKey;
