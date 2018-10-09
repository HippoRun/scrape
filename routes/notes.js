var express = require('express'); 
var app = express.Router(); 
var db = require("../models");

//get route to retrieve all notes for a particlular article
app.get('/getNotes/:id', function (req,res){
  db.Article.findOne({_id: req.params.id})
    .populate('notes')
    .then(function(results){
        res.json(results)
    })
    .catch(function(err){
        res.json(err);
    })
});

//get route to return a single note to view it
app.get('/getNote/:id', function (req,res) {
  db.Note
  .findOne({_id: req.params.id})
  .then( function(result){
      res.json(result)
    })
  .catch(function(err){
    res.json(err);
  }); 
});

//post route to create a new note in the database
app.post('/createNote', function (req,res){
    var {title, body, articleId} = req.body
    var note = {
        title,
        body
    }; 
    
    db.Note.create(note)
    .then( function(result){
      db.Article
        .findOneAndUpdate({_id: articleId}, {$push:{notes: result._id}},{new:true})
        .then( data => res.json(result))
        .catch( err => res.json(err));
    })
    .catch(err => res.json(err));

   
});

//post route to delete a note
app.post('/deleteNote', function(req,res){
  var noteId = req.body;
  db.Note.remove({_id: noteId})
    .then(function(result){
        res.json(result);
    })
    .catch(function(err){
        res.json(err);
    });
});


module.exports = app;