// start server 
const express = require('express');

const app = express();

app.get('/',(req,rest)=>{rest.send('hello world');});


module.exports = app;