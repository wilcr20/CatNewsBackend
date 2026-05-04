
const cheerio = require("cheerio");
const cloudscraper = require('cloudscraper');

const URL = "https://japantoday.com";
const newsItemsFirstSection = "div.col-sm-4.col-md-3.hidden-xs.left-column h3";
const newsItemsSecodSection = "div.col-sm-4.col-md-3.hidden-xs.left-column h4.text-xstrong.mt-5.mb-0";

exports.home = (_, res) => {
    cloudscraper.get(URL).then((body) => {
        var $ = cheerio.load(body);

        let firstItemList = $(newsItemsFirstSection);
        let secondItemList = $(newsItemsSecodSection);
        console.log(secondItemList.length)
        var news = [];

        firstItemList.each((_idx, el) => {
            var newsObject = { title: "", imageUrl: "", url: "", date: "", type: "" };
            let title = $(el).text();
            let url = $(el).find("a").attr("href");
            if ((title && title.trim() != "") && (url && url.trim() != "")) {
                newsObject.title = title;
                newsObject.url = URL + url;
                news.push(newsObject);
            }
        });


        secondItemList.each((_idx, el) => {
            var newsObject = { title: "", imageUrl: "", url: "", date: "", type: "" };
            let title = $(el).text();
            let url = $(el).find("a").attr("href");
            if ((title && title.trim() != "") && (url && url.trim() != "")) {
                newsObject.title = title;
                newsObject.url = URL + url;
                news.push(newsObject);
            }
        });


        res.send({ countNews: news.length, data: news });
    }, (err) => {
        res.send(err)
    })
}