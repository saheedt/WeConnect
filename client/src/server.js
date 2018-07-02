require('dotenv').config();
const express = require('express');
const path = require('path');
const { log } = require('util');

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
log(`app running on port ${port}`);
