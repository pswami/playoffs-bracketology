const express = require('express');
const paths   = require('./config/paths');

const app  = express();

const port = process.env.PORT || 5000;

app.use(express.static(paths.appBuild));

app.listen(port, () => console.log(`Listening on port ${port}`));