const fs = require('fs');
const path = require('path');

module.exports = async () => {
const modelsPath = path.resolve(__dirname, './../models')

fs.readdirSync(modelsPath).forEach(file => {
  require(modelsPath + '/' + file);
})
}