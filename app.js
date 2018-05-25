let express    = require('express');
let app        = express();
let api        = require('./api');
let bodyParser = require('body-parser');
let conf       = require('./conf');
let STATUS_CODES = require('http').STATUS_CODES
let fs = require('fs')
let morgan = require('morgan')
let path = require('path')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
app.use(morgan('dev', {stream: accessLogStream}))
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public/searchApp/dist/searchApp'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.options('*', (req, res, next) => {
    res.send();
});

app.use('/api', api);

app.use((req, res, next) => {
    const err = res.err || {};
    const status = err.status || 500;
    const message =  err.message || STATUS_CODES[status] || 'Internal Server Error';
    res.status(status).json({ message });
});

app.listen(conf.port, () => console.log(`Example app listening on port ${conf.port}!`))
