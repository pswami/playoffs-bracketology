const express = require('express');
const request = require('request');
const paths   = require('./config/paths');

const NBA_BRACKETS_URL = 'https://data.nba.net/prod/v1/2017/playoffsBracket.json';
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

const app  = express();

app.get('/api/v1/brackets/nba', function (req, res) {
  request(NBA_BRACKETS_URL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body)
      // do more stuff
      res.send(info);
    }
  })
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(paths.appBuild));

  app.get("*", function (req, res) {
    res.sendFile(paths.appBuild + "/index.html");
  });
}


app.listen(port, host, () => console.log(`Listening on port ${port}`));