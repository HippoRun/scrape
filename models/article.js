var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  headline: {
    type: String,
    unique: true
  },
  summary: String,
  Url: String,
  saved: {
    type: Boolean,
    default: false
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

var Article = module.exports = mongoose.model('Article', articleSchema);