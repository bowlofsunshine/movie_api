const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const app = express();
const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;
const passport = require("passport");
require("./passport");
const cors = require("cors");
app.use(cors());
// this is a test commit
app.use(bodyParser.json());
var auth = require("./auth")(app);
app.use(express.static("public"));

// var allowedOrigins = ["http://localhost:8080", "http://testsite.com"];

// app.use(
//   cors({
//     origin: function(origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         // If a specific origin isn’t found on the list of allowed origins
//         var message =
//           "The CORS policy for this application doesn’t allow access from origin " +
//           origin;
//         return callback(new Error(message), false);
//       }
//       return callback(null, true);
//     }
//   })
// );
// Gets the list of data about ALL movies
app.get("/movies", passport.authenticate("jwt", { session: false }), function (
  req,
  res
) {
  Movies.find()
    .then(function (movies) {
      res.status(201).json(movies);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get(
  "/documentation",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.sendFile("public/documentation.html", { root: __dirname });
  }
);

//get a movie by title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Movies.findOne({ Title: req.params.Title })
      .then(function (movies) {
        res.json(movies);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//return genre data by name
app.get(
  "/movies/genres/:Name",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Movies.findOne({ "Genre.Name": req.params.Name })
      .then(function (movies) {
        res.json(movies.Genre);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//return data on director by name
app.get(
  "/movies/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then(function (movies) {
        res.json(movies.Director);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Add a user
// we will expect JSON in this format
// {
//   ID: Interger,
//   Username: String,
//   Password: String,
//   Email: String,
//   Birthday: Date
// }

app.post(
  "/users",
  //validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means 'opposite of isEmpty' in plain english 'is not empty'
  //or user. islength({min: 5}) which means min value of 5 char. are allowed
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  function (req, res) {
    //check the validation object for errorss
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var hashPassword = Users.hashPassword(req.body.Password);
    //search test to see if user with requested username already exists
    Users.findOne({ Username: req.body.Username })
      .then(function (user) {
        if (user) {
          //if user is found, send response that it exists already
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
            .then(function (user) {
              res.status(201).json(user);
            })
            .catch(function (error) {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//Update a user's info, by username
// we'll expect JSON in this format
// {
//   Username: String,
//   (required)
//   Password: String,
//   (required)
//   Email: String,
//   (required)
//   Birthday: Date
// }

app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    if () {
      Users.findOneAndUpdate(
        { Username: req.params.Username },
        {
          $set: {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          }
        },
        { new: true }, // This line makes sure that the updated document is returned
        function (err, updatedUser) {
          if (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
          } else {
            res.json(updatedUser);
          }
        }
      )
    } else {
      res.status(200).send("not authorized to upadate" + req.params.Username);
    };
  }
);

//Add a movie to a user's list of favorites
app.post(
  "/users/:Username/favorites/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID }
      },
      { new: true }, // This line makes sure that the updated document is returned
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Get all users
app.get("/users", passport.authenticate("jwt", { session: false }), function (
  req,
  res
) {
  Users.find()
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get a user by username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOne({ Username: req.params.Username })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//delete favorite movie from user list by username

// app.delete("/users/:username/favorites/:title", (req, res) => {
//   res.send("Favorite movie successfully deleted");
// });
app.delete(
  "/users/:Username/favorites/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { Favorites: req.params.MovieID }
      },
      { new: true }, // This line makes sure that the updated document is returned
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//Delete a user by username
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    if () {
      Users.findOneAndRemove({ Username: req.params.Username })
        .then(function (user) {
          if (!user) {
            res.status(400).send(req.params.Username + " was not found");
          } else {
            res.status(200).send(req.params.Username + " was deleted.");
          }
        })
    } else {
      res.status(200).send("not authorized to delete" + req.params.Username);
    }
      .catch (function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
  }
);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// listen for requests
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
  console.log("Listening on Port ${port}");
});
// app.listen(8080, () => console.log("Your app is listening on port 8080."));

// mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-bacig.mongodb.net:27017,cluster0-shard-00-01-bacig.mongodb.net:27017,cluster0-shard-00-02-bacig.mongodb.net:27017 --ssl --username rachel --password jennad --authenticationDatabase admin --db myFlixDB --collection movies --type json --file ./mongoose/movies.json
