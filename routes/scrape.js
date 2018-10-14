var express = require('express');
var cheerio = require('cheerio');
var rp = require('request-promise');
var app = express.Router();
var db = require('../models');

// scrape new articles
app.get("/newArticles", function(req, res){
 
  var options = {
      uri: 'https://www.newsarama.com/',
      transform: function (body) {
      return cheerio.load(body);
    }
  };

  db.Article.find({}).then(function(savedArticles){
    var savedHeadline = savedArticles.map(function(article){
      article.headline;
    }); 
      rp(options)
      .then(function ($) {
        
        var articleArray = [];
          
        $('p.post-desc').each(function(i, element){
          var headline = $(element).children().attr("title");
          var Url = $(element).children().attr("href");
          var summary = $(element).text().trim();
            
          //make sure article has link
          if(Url){
            //make sure the article is not repated
            if(!savedHeadline.includes(headline)){
              articleArray.push({
                headline: headline,
                Url: 'https://www.newsarama.com'+ Url,
                summary: summary
              });
            }
          }
        });

        db.Article.create(articleArray)
        .then(function(result){
          res.json({count: articleArray.length});
        }).catch(function(err){
          console.log(err);
        });
      })
      .catch(function (err) {
          console.log(err);
      });
    });
});

module.exports = app;