const mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Genre: {
    Name: String,
    Bio: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

var userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  Favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

var Movie = mongoose.model("Movie", movieSchema);
var User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true
});

// var <collectionSchema> = mongoose.<Schema>({
//   Key: {Value},
//   Key: {Value},
//   Key: {
//     Key: Value,
//     Key: Value
//   });
