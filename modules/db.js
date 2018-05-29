let mongodb = require('mongodb');
let conf = require('../conf');
let data = require('./data');

var connection = undefined;

async function getConnection() {
  if(connection)
    return connection
  else {
    connection = (await mongodb.connect(conf.mongoUri)).collection(conf.collection)
    return connection;
  }

}
async function find(options) {
  if(options.data){
    options.data = JSON.parse(options.data)
  }
  if(options.data){
    return  (await getConnection('products'))
      .find(options.data.query || {})
      .sort(options.data.sort || {})
      .toArray()
  }
  else {
    return  (await getConnection('products'))
      .find({})
      .sort({})
      .toArray()
  }
}
async function getLimits(fieldName){
  if(data[fieldName] != 'number') throw 'only numbers are supported for limits'
  return {
    max : (await getConnection('products'))
      .find({})
      .limit(1)
      .sort({ [fieldName] : -1 })
      .toArray() ,
    min : (await getConnection('products'))
      .find({})
      .limit(1)
      .sort({ [fieldName] : 1 })
      .toArray()
  }
}
async function getCategories(fieldName){
  if(data[fieldName] != 'string') throw 'only string fields are allowed'
  return (await getConnection('products')).distinct(fieldName)
}

module.exports = {
  find,
  getLimits,
  getCategories,
}
