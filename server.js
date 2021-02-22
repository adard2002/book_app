'use strict';

const express = require('express');
// const superagent = require('superagent');
const PORT = process.env.PORT || 3111;

const app = express();

app.use(express.static('public')); // loads the public folder (css)
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get('/', getBooks);

// app.get('/book-route', showSearchPage);
// app.post('/book-search', makeBookSearch);
// Crate as a post because data is being sent to us.
// The get describes the page and the post path ties these events together. So we keep them the same.

// If user is taken to the home page the following text will appear: "You have found the home page!"



function getBooks(req, res){
  res.render('pages/index');
}
// function showSearchPage(req,res){
//   res.render('error.ejs');
// }

// function makeBookSearch(req,res){
//   cost url = `https://www.googleleapis.com/books/v1/volumes?q=+intitle:${title}`;
// }

// superagent(url)
// .then(books => {
//   // console.log(books.body.items);

//   const titles = books.body.map( book => book.volumeInfo.title);
//   res.render('results.ejs', {titles: titles});
// });


// ====== PORT Listener ======
app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
