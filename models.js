const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

var Movie = mongoose.model("Movie", movieSchema);
var User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;

// mongoose.connect(process.env.CONNECTION_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.connect("mongodb://localhost:27017/myFlixDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// var <collectionSchema> = mongoose.<Schema>({
//   Key: {Value},
//   Key: {Value},
//   Key: {
//     Key: Value,
//     Key: Value
//   });
