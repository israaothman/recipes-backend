'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

const client = require('./models/client.js');


const errorHandler = require('../middleware/500');
const notFoundHandler = require('../middleware/404');
const routes = require('../routes/routes');


app.use(routes);
app.use('*',notFoundHandler);
app.use(errorHandler);


module.exports = {
    server: app,
    start: (port)=>{
      const PORT = port || process.env.PORT || 3030;
      
      client.connect()
      .then(()=>{
          app.listen(PORT, () =>
          console.log(`listening on ${PORT}`)
          );
      })   
    },
  };