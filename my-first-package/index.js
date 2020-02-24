const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

let Movies = [
  {
    title: "Little Miss Sunshine",
    description:
      "A family determined to get their young daughter into the finals of a beauty pageant take a cross-country trip in their VW bus.",
    genre: "Comedy-Drama",
    director: "Valerie Faris",
    imageURL: "img/littlemisssunshine.png"
  },
  {
    title: "Inglorious Bastards",
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
    genre: "Quentin Tarantino",
    director: "Drama",
    imageURL: "img/inglorious.png"
  },
  {
    title: "Parasite",
    description:
      "A poor family, the Kims, con their way into becoming the servants of a rich family, the Parks. But their easy life gets complicated when their deception is threatened with exposure.",
    genre: "Thriller",
    director: "Bong Joon Ho",
    imageURL: "img/parasite.png"
  }
];

let Directors = [
  {
    name: "Quentin Tarantino",
    dateofbirth: "March 27, 1963"
  },
  {
    name: "Bong Joon Ho",
    dateofbirth: "September 14, 1969"
  },
  {
    name: "Valerie Faris",
    dateofbirth: "October 20, 1958"
  }
];

let Genres = [
  {
    name: "Comedy-Drama",
    description:
      "Comedy-Drama is a genre of dramatic works in which plot elements are a combination of comedy and drama."
  },
  {
    name: "Thriller",
    description:
      "A Thriller is a story that is usually a mix of fear and excitement. It has traits from the suspense genre and often from the action, adventure or mystery genres, but the level of terror makes it borderline horror fiction at times as well. It generally has a dark or serious theme, which also makes it similar to drama."
  },
  {
    name: "Drama",
    description:
      "Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone, focusing on in-depth development of realistic characters who must deal with realistic emotional struggles"
  }
];

let Users = [
  {
    username: "abc123",
    password: "asdf123",
    email: "abc@gmail.com",
    dateofbirth: "March 2, 1990",
    favorites: {
      title: "Parasite"
    }
  }
];

// Gets the list of data about ALL movies
app.get("/movies", function(req, res) {
  res.json(Movies);
  res.send("check out my fav mooooovies!");
});

app.get("/documentation", function(req, res) {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies/:title", (req, res) => {
  res.json(
    Movies.find(movies => {
      return movies.title === req.params.title;
    })
  );
});

app.get("/genre/:name", (req, res) => {
  res.json(
    Genres.find(genres => {
      return genres.name === req.params.name;
    })
  );
});

app.get("/director/:name", (req, res) => {
  res.json(
    Directors.find(director => {
      return director.name === req.params.name;
    })
  );
});

app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = "Missing username in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.status(201).send(newUser);
    res.send("User successfully added");
  }
});

app.put("/users/:username", (req, res) => {
  res.send("User successfully updated");
});

app.post("/users/:username/:favorites", (req, res) => {
  let addFavorite = req.body;

  if (!addFavorite.title) {
    const message = "Missing movie title in request body";
    res.status(400).send(message);
  } else {
    addFavorite.id = uuid.v4();
    Users.push(addFavorite);
    res.status(201).send(addFavorite);
    res.send("Favorite movie successfully added");
  }
});

app.delete("/users/:username/favorites/:title", (req, res) => {
  res.send("Favorite movie successfully deleted");
});

app.delete("/users/:username", (req, res) => {
  res.send("User successfully deleted");
});

app.use(express.static("public"));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
