var express = require('express');
var app = express.Router();
var db = require("../models");

//get route to update 'saved' boolean to true
app.get('/save/:id', function(req,res){
  db.Article.update({_id: req.params.id},{saved: true})
    .then(function(result){
      res.redirect('/');
    })
    .catch(function(err) {
      res.json(err)
    });
});

//get route to render savedArticles.handlebars and populate with saved articles
app.get('/viewSaved', function(req, res){
  db.Article.find({})
    .then(function(result){
      res.render('savedArticles', {articles:result})
    })
    .catch(function(err) {
      res.json(err)
    });
  });

//delete route to remove an article from savedArticles
app.delete('/deleteArticle/:id', function(req,res){
  db.Article
    .remove({_id: req.params.id})
    .then(function(result){
      res.json(result);
    } )
    .catch(function(err) {
      res.json(err)
    });
});


module.exports = app;