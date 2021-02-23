'use strict';

const express = require('express');
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public')); // loads the public folder (css)
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get('/', getBooks);

app.get('/searches/new', newSearch);

function getBooks(req, res){
  res.render('pages/index');
}

function newSearch(req, res){
  res.render('pages/searches/new.ejs');
}

function getResults(req, res){
  const url = 'https://www.googleapis.com/books/v1/volumes?q=';
}

// Need Constructor function for titles | image, title, author, and desc

function Book(bookObject){
  this.img = bookObject.imageLinks.medium || `https://i.imgur.com/J5LVHEL.jpg`;
  this.title = bookObject.title ? bookObject.title : 'Title not found';
  this.author = bookObject.authors || 'Author not found';
  this.desc = bookObject.description || 'No description provided';
}




// ====== PORT Listener ======
app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
