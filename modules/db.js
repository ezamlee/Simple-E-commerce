let mongodb  = require('mongodb');
let conf = require('../conf');

async function getConnection(){
  return (await mongodb.connect(conf.mongoUri)).collection(conf.collection);
}
async function find(query,options){
  if(options){
    var skip  = (options.skip && typeof parseInt(options.skip) === "number" )
                ? options.skip
                : 0
    var limit = (options.limit && typeof parseInt(options.limit) === "number" && options.limit < 20 )
                ? options.limit
                : 5
  }
  return (await getConnection('products')).find(query).skip(parseInt(skip)).limit(parseInt(limit)).toArray();
}

module.exports = {
  find
}
