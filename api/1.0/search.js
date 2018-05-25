let router = require('express').Router();
let conf   = require('../../conf');
let db     = require('../../modules/db') ;
router.get('/',(req,res,next) => {
    db.find(null,req.query).then(data => {
      res.send({
        status  : 'success',
        message : data
      })
    })

  })
  router.use( (req, res, next) => next() );
module.exports = router;
