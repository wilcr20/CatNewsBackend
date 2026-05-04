const cheerio = require("cheerio");
const cloudscraper = require('cloudscraper');

const URL = "https://somoskudasai.com/";
const newsItems = "main div.grid.auto-rows-max.gap-8 article";


exports.home = (_, res) => {
    cloudscraper.get(URL).then((body) => {
        var $ = cheerio.load(body);

        let listItems = $(newsItems);
        console.log(listItems.length)
        var news = [];

        listItems.each((_idx, el) => {
            var newsObject = { title: "", imageUrl: "", url: "", date: "", type: "" };
            newsObject.title = $(el).find("h3").text();
            newsObject.url = $(el).find("h3").find("a").attr("href");
            newsObject.imageUrl = $(el).find("img").attr("src");
            newsObject.date = $(el).find("span.truncate").text();
            newsObject.type = $(el).find("header p").text();
            news.push(newsObject);

        });

        res.send({ countNews: news.length, data: news });
    }, (err) => {
        res.send(err)
    })
}
