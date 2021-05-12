const express = require('express');
const app = express();


// Middlewares
app.use(express.json());
// Routes
app.use(require('./routes/employees'));

function sleep(milliseconds) {
 var start = new Date().getTime();
 for (var i = 0; i < 1e7; i++) {
  if ((new Date().getTime() - start) > milliseconds) {
   break;
  }
 }
}

// Starting the server

app.listen(3000, () =>  {
    sleep(5000);
    console.log('Server on port');
})
