const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const mongoose = require("mongoose");
const app = express();
const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;
const passport = require("passport");
require("./passport");

app.use(bodyParser.json());
var auth = require("./auth")(app);
app.use(express.static("public"));

// Gets the list of data about ALL movies
app.get("/movies", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get(
  "/documentation",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    res.sendFile("public/documentation.html", { root: __dirname });
  }
);

//get a movie by title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ Title: req.params.Title })
      .then(function(movies) {
        res.json(movies);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//return genre data by name
app.get(
  "/movies/genres/:Name",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ "Genre.Name": req.params.Name })
      .then(function(movies) {
        res.json(movies.Genre);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//return data on director by name
app.get(
  "/movies/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then(function(movies) {
        res.json(movies.Director);
      })
      .catch(function(err) {
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

app.post("/users", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Users.findOne({ Username: req.body.Username })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(function(user) {
            res.status(201).json(user);
          })
          .catch(function(error) {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

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
  function(req, res) {
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
      function(err, updatedUser) {
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

//Add a movie to a user's list of favorites
app.post(
  "/users/:Username/:Favorites/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { Favorites: req.params.MovieID }
      },
      { new: true }, // This line makes sure that the updated document is returned
      function(err, updatedUser) {
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
app.get("/users", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get a user by username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOne({ Username: req.params.Username })
      .then(function(user) {
        res.json(user);
      })
      .catch(function(err) {
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
  "/users/:Username/:Favorites/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { Favorites: req.params.MovieID }
      },
      { new: true }, // This line makes sure that the updated document is returned
      function(err, updatedUser) {
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
  function(req, res) {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then(function(user) {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
