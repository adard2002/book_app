'use strict';

const express = require('express');
// const superagent = require('superagent');
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











// ====== PORT Listener ======
app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
