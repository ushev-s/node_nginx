const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');

const app = express();

const options = {
  cert: fs.readFileSync('./ssl/svushev_click.crt'),
  ca: fs.readFileSync('./ssl/svushev_click.ca-bundle'),
  key: fs.readFileSync('./ssl/svushev_click.rsa.key'),
};

app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

app.get('/', (req, res) => {
  res.send('<h1>NodeJS App 1</h1>');
});

const httpsServer = https.createServer(options, app);

httpsServer.listen(5001, () => {
  logger.info(`Server started on port 5001`);
});

const httpServer = http.createServer(options, app);
httpServer.listen(5000, () => {
  logger.info(`Server started on port 5000`);
});
