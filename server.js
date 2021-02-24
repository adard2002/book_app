'use strict';
const express = require('express');
const superagent = require('superagent');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// const savedBookTitles = [];

app.use(express.static('public')); // loads the public folder (css)
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs'); //tell express to load ejs this unlocks the response render

app.get('/', getBooks);
app.get('/searches/new', makeBookSearch);

app.post('/searches', getResults);
// app.post('/save-book', saveBook);

// Need Constructor function for titles | image, title, author, and desc
function Book(bookObject){
  this.title = bookObject.title ? bookObject.title : 'Title not found';
  // this.img = bookObject.imageLinks || `https://i.imgur.com/J5LVHEL.jpg`;
  this.author = bookObject.authors || 'Author not found';
  this.desc = bookObject.description || 'No description provided';
}

function getBooks(req, res){ //home page
  res.render('pages/index');
}

function makeBookSearch(req, res){ // search for book
  res.render('pages/searches/new.ejs');
}

function getResults(req, res){
  let url = `https://www.googleapis.com/books/v1/volumes?q=`;
  // console.log(req.body);
  // if(req.body.searchType === 'title'){ url += `+intitle:${req.body.searchBar}`;}
  // if(req.body.searchType[1] === 'author'){ url += `+inauthor:${req.body.searchType[0]}`;}
  superagent.get(url)
    .then(books => books.body.items.map(book => new Book(book.volumeInfo)))
    .then(results => res.render('pages/searches/show', {results: results}));
}
// function saveBook(req, res){
//   savedBookTitles.push(req.body.title);
//   console.log(req.body.title);
//   res.redirect('/');
// }
// ====== PORT Listener ======
app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

