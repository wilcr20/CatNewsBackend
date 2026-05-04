
const cheerio = require("cheerio");
const cloudscraper = require('cloudscraper');

const URL = "https://www.infobae.com/ultimas-noticias-america/";
const newsItems = "div.feed-list-wrapper a";

exports.home = (_, res) => {
    cloudscraper.get(URL).then((body) => {
        var $ = cheerio.load(body);

        let listItems = $(newsItems);
        console.log(listItems.length)
        var news = [];

        listItems.each((_idx, el) => {
            var newsObject = { title: "", imageUrl: "", url: "", date: "", type: "" };
            newsObject.title = $(el).find("h2").text();
            newsObject.url = "https://www.infobae.com" + $(el).attr("href");
            newsObject.imageUrl = $(el).find("img").attr("src");
            news.push(newsObject);
        });
        res.send({ countNews: news.length, data: news });
    }, (err) => {
        res.send(err)
    })
}