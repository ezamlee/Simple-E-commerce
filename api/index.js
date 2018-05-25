let router = require('express').Router();
let api_1_0 = require('./1.0');

router.use('/', api_1_0);
router.use('/v1', api_1_0);
router.use('/v1.0', api_1_0);
module.exports = router;
