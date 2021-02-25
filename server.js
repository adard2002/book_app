'use strict';
const express = require('express');
const superagent = require('superagent');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// const savedBookTitles = [];

app.use(express.static('public')); // loads the public folder (css)
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); //tell express to load ejs this unlocks the response render

app.get('/', getBooks);
app.get('/searches/new', makeBookSearch);
app.post('/searches', getResults);
// app.post('/save-book', saveBook);

// Fail safe routes
app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.get((error, req, res) => handleError(error, res)); // handle errors


function getBooks(req, res) { //home page
  res.render('pages/index');
}
function makeBookSearch(req, res) { // search for book
  res.render('pages/searches/new.ejs');
}


// function getResults(req, res) {
//   const title = req.body.title;
//   const url = `https://www.googleapis.com/books/v1/volumes`;

//   superagent.get(url)
//     .query({
//       q: `+in${req.body.searchType}:${req.body.searchQuery}`
//     })
//     .then(books => {
//       const titles = books.body.items.map(book => new Book(book.volumeInfo));
//       res.render('pages/searches/show', { titles: titles });
//       console.log(title);
//     }).catch(err => handleError(err, res));
// }


// function saveBook(req, res) {
//   savedBookTitles.push(req.body.title);
//   res.redirect('/');
// }
// Need Constructor function for titles | image, title, author, and desc
function Book(info) {
  const placeHolderImage = `https://i.imgur.com/J5LVHEL.jpg`;

  let httpRegex = /^(http:\/\/)/g;

  this.title = info.title ? info.title : 'No title available';
  this.img_url = info.imageLinks ? info.imageLinks.smallThumbnail.replace(httpRegex, 'https://') : placeHolderImage;
  this.author = info.authors ? info.authors : 'No author available';
  this.description = info.description ? info.description : 'No description available';
}



function getResults(req, res) {
  let url = `https://www.googleapis.com/books/v1/volumes?q=`;
  if (req.body.searchType === 'title') { url += `+intitle:${req.body.searchBar}`; }
  if (req.body.searchType === 'author') { url += `+inauthor:${req.body.searchBar}`; }
  superagent.get(url)
    .then(books => books.body.items.map(book => new Book(book.volumeInfo)))
    .then(results => res.render('pages/searches/show', { results: results }))
    .catch(err => handleError(err, res));

  console.log(req.body);
}

// function saveBook(req, res){
//   savedBookTitles.push(req.body.title);
//   console.log(req.body.title);
//   res.redirect('/');
// }


function handleError(error, response) {
  response.render('pages/error', { error: error });
}



// ====== PORT Listener ======
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

