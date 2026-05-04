const cheerio = require("cheerio");
const cloudscraper = require('cloudscraper');

const URL = "https://crhoy.com/";
const newsItems = "div.style_original-layout__cwd2i a.no-underline ";


exports.home = (_, res) => {
    cloudscraper.get(URL).then((body) => {
        var $ = cheerio.load(body);

        let listItems = $(newsItems);
        console.log(listItems.length)
        var news = [];

        listItems.each((_idx, el) => {
            var newsObject = { title: "", imageUrl: "", url: "", date: "", type: "" };
            newsObject.title = $(el).find("h2").text() || $(el).find("h3").text();
            newsObject.url = URL + $(el).attr("href");

            const images = $(el).find("img").attr("src")
            newsObject.imageUrl = images;


            newsObject.type = $(el).find("span.orange-label").text();
            if (newsObject.title && newsObject.title.trim() != "") {
                news.push(newsObject);

            }

        });

        res.send({ countNews: news.length, data: news });
    }, (err) => {
        res.send(err)
    })
}
