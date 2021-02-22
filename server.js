'use strict';

const express = require('express');
const { response } = require('express');
const PORT = process.env.PORT || 3111;

const app = express();

app.use(express.static('./public'));

// If user is taken to the home page the following text will appear: "You have found the home page!"
app.get('/', (request, response) => {
  response.send('You have found the home page!');
});






// ====== PORT Listener ======
app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
