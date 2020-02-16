const express = require('express'),
morgan = require('morgan');
const app = express();

let topMovies = [ {
    title : 'Little Miss Sunshine'
},
{
    title : 'Lord of the Rings'
},
{
    title : 'Perfume'
},
{
    title : '10 Things I Hate About You'
},
{
    title : 'Inglorious Bastards'
},
{
    title : 'Parasite'
},
{
    title : 'When Harry Met Sally'
},
{
    title : 'Romy and Michele\'s High School Reunion'
},
{
    title : 'Once Upon a Time in Hollywood'
},
{
    title : 'Star Wars'
}
]

app.use(morgan('common'));

app.get('/secreturl', function (req, res) {
  res.send('This is a secret url with super top-secret content.');
});

app.get('/', function(req, res) {
  res.send('check out my fav mooooovies!')
});

app.get('/documentation', function(req, res) {
  res.sendFile('public/documentation.html', { root : __dirname });
});

app.use(express.static('public'));

app.get('/movies', function(req, res) {
  res.json(topMovies)
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
