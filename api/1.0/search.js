let router = require('express').Router();
let db = require('../../modules/db')

router.get('/', (req, res, next) => {
  db.find(req.query)
    .then(data => {
      res.send({
        status: 'success',
        message: data
      })
    })
    .catch(err => {
      res.err = {
        status: 500,
        message: err
      }
      next()
    })
})
router.get('/limits/:fieldName',async (req, res, next) => {
  try{
    min = await (await db.getLimits(req.params.fieldName)).min
    max = await (await db.getLimits(req.params.fieldName)).max
    res.send({
        status: 'success',
        message: [...min,...max]
    })
  }catch(err){
    console.log(err)
    res.err = {
      status : 400,
      message : err
    };
    next();
  }
})
router.get('/list/:fieldName', async (req,res,next) => {
    try{
      let data = await db.getCategories(req.params.fieldName);
      res.send({
          status: 'success',
          message: data.sort()
      })
    }catch(err){
      res.err = {
        status  : 400,
        message : err,
      }
      next()
    }
})
router.use((req, res, next) => next());
module.exports = router;
