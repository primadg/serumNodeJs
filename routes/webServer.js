const express = require('express');
const app = express();
const port = 3500
const bodyParser = require('body-parser');
const ChartsController = require('../controllers/chartsController')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/chart', ChartsController.getChart)

app.listen(port, () => {
    console.log(`App listen on port ${port}`)
})

module.exports = app;
