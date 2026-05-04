const express = require('express');
const cheerio = require("cheerio");
const cloudscraper = require('cloudscraper');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(function (_req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


app.get('/', function (_req, res) {
    res.send('Hello :)');
});


// Validate if is possible to scrape the html from the url
app.post('/testWebsite', function (req, res) {
    cloudscraper.get(req.body.url).then((body) => {
        res.send({ htmlView: body });
    }, (err) => {
        res.send(err);
    })
});

var server = app.listen(3500, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server listening at http://%s:%s", host, port)
})


//Routers and controllers
const somosKudasaiRouter = require("./routers/somosKudasaiRouter");
app.use("/somosKudasai", somosKudasaiRouter);

const crHoyRouter = require("./routers/crHoyRouter");
app.use("/crhoy", crHoyRouter);

const japanTodayRouter = require("./routers/japanTodayRouter.js");;
app.use("/japanToday", japanTodayRouter);
