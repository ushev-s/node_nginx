const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();
const app = express();
//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('<h1>NodeJS App 1</h1><h2>message 1212122222</h2>');
});

//Define Routes
app.use('/api/logs', require('./routes/log'));

const httpServer = http.createServer(app);
httpServer.listen(5000, () => {
  console.log(`Server started on port 5000`);
});
