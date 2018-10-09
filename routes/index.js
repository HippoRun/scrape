var express = require('express'); 
var app = express.Router();
var db = require("../models");

//get route to root, populating index.handlebars with articles
app.get('/', function(req,res){
  db.Article.find({})
    .then(function(articles){
        res.render('index', {articles})
    }).catch(function(err){
        res.json(err);
    });
});

module.exports = app;