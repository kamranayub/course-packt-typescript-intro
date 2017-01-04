import mongoose = require('mongoose')

function init(Schema: typeof mongoose.Schema, mongoose: mongoose.Mongoose) {
  var TheSchema = new Schema({
    title: String,
    complete: Boolean
  });

  return mongoose.model<Todo & mongoose.Document>('Todos', TheSchema);
}

export = { init: init }
