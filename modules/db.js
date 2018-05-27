let mongodb = require('mongodb');
let conf = require('../conf');
let data = require('./data');

async function getConnection() {
  return (await mongodb.connect(conf.mongoUri)).collection(conf.collection);
}
async function find(options) {
  let sortObj = [];
  let query = {};
  if (options) {
    var skip = (options.skip && typeof parseInt(options.skip) === 'number') ? options.skip : 0

    var limit = (options.limit && typeof parseInt(options.limit) === 'number' &&   options.limit < 20 ) ? options.limit : 12

    var sort = (options.sort)
                ? ((options.sort).split(',')).map((item) => {
                    item = item.split('|');
                    if (item.length == 2 && data[item[0]])  sortObj.push([item[0], item[1] == 1 ? 'asc' : 'desc'])
                  })
                : null

    if (options.filter) {
      let filter = options.filter;
      filter = filter.split(',').map(item => {
          item = item.split("|")
          if ((item.length == 2 || item.length == 3) && data[item[0]] == 'number') {
            let fieldName = item[0],lower = parseInt(item[1]),upper = parseInt(item[2] || item[1]);
            query[item[0]] = {'$lte': upper,'$gte': lower,}
          }
          else if(item.length == 2 && data[item[0]] == 'string'){
            let fieldName = item[0];
            let value = item[1];
            query[item[0]] = item[1];
          }
      })
    }

    if(options.q){
      var search = options.q
      query['$text'] = { ['$search'] : options.q  }
    }
  }
  console.log(query);
  return (await getConnection('products'))
    .find(query)
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .sort(sortObj)
    .toArray();
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
