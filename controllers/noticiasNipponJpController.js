
const cheerio = require("cheerio");
const cloudscraper = require('cloudscraper');

const URL = "https://noticiasnippon.jp/";
const newsItems = "div#grid > div";

exports.home = (_, res) => {
    cloudscraper.get(URL).then((body) => {
        var $ = cheerio.load(body);

        let listItems = $(newsItems);
        console.log(listItems.length)
        var news = [];

        listItems.each((_idx, el) => {
            var newsObject = { title: "", imageUrl: "", url: "", date: "", type: "" };

            let imageUrl = ""
            const img = $(el).find("div.back-img").attr("style");
            if (img != undefined && img.includes("background-image: url('")) {
                imageUrl = img.split("background-image: url('")[1].split("');")[0]
            }
            newsObject.title = $(el).find("article p").text();

            if (newsObject.title != undefined && newsObject.title != "") {
                newsObject.url = $(el).find("h3").find("a").attr("href");
                newsObject.imageUrl = imageUrl;
                newsObject.date = $(el).find("span.mg-blog-date > a").text().trim();
                newsObject.type = $(el).find("div.mg-blog-category > a").text().trim();
                news.push(newsObject);
            }

        });
        res.send({ countNews: news.length, data: news });
    }, (err) => {
        res.send(err)
    })
}