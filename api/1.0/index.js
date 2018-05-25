let router = require('express').Router();
let STATUS_CODES = require('http').STATUS_CODES
const version = '1.0';
const name = require('../../conf').name;
let search = require('./search');

router.get('/', (req, res) => res.json({
    name,
    version,
}));

router.use('/search',search);


router.use( (req, res, next) => next() );


module.exports = router
