const fs = require("fs");

// node .\generateFilesForWebsite.js websiteName
// node .\generateFilesForWebsite.js japanNews

var websiteName = process.argv[2];

if (websiteName == undefined || websiteName.trim() == "") {
    console.log("invalid param por website name")
    return;
}

const controllerFilePath = `./controllers/${websiteName}Controller.js`;
const routerFilePath = `./routers/${websiteName}Router.js`;

//create the controller file
fs.writeFile(controllerFilePath, '', function (err) {
    if (err) throw err;
    includesContentForController();
});

//create the router file
fs.writeFile(routerFilePath, '', function (err) {
    if (err) throw err;
    includesContentForRouter();
});

function includesContentForController() {
    const contentString =
        `
const cheerio = require("cheerio");
const cloudscraper = require('cloudscraper');
        
    const URL = "https://example.com/";
    const newsItems = "main div.grid.auto-rows-max.gap-8 article";
        
    exports.home = (_, res) => {
        cloudscraper.get(URL).then((body) => {
            var $ = cheerio.load(body);
        
            let listItems = $(newsItems);
            console.log(listItems.length)
            var news = [];
        
            listItems.each((_idx, el) => {
                var newsObject = { title: "", imageUrl: "", url: "", date: "", type: ""};
                newsObject.title = $(el).find("h3").text();
                newsObject.url = $(el).find("h3").find("a").attr("href");
                newsObject.imageUrl = $(el).find("img").attr("src");
                newsObject.date = $(el).find("span.truncate").text();
                newsObject.type = $(el).find("header p").text();
                news.push(newsObject);
            });
            res.send({ data: news});
        }, (err) => {
            res.send(err)
        })
    }`;

    //Add the content to the file
    fs.appendFile(controllerFilePath, contentString, 'utf8',
        function () { });
}

function includesContentForRouter() {
    const contentString =
        `
const express = require("express");
const router = express.Router();
        
const ${websiteName}Controller = require("../controllers/${websiteName}Controller");
        
router.get("/home", ${websiteName}Controller.home);
        
module.exports = router; `;
    //Add the content to the file
    fs.appendFile(routerFilePath, contentString, 'utf8',
        function () {
            updateIndexJs();
        });
}


function updateIndexJs() {
    const importLinesForUseRouter =
        `
const ${websiteName}Router = require("${routerFilePath}");;
app.use("/${websiteName}", ${websiteName}Router);`;

    fs.appendFile('index.js', `${importLinesForUseRouter}\n`, (err) => {
        if (err) throw err
        console.log('Data appended successfully')
    })
}