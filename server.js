const path = require('path');
const express = require('express');
const Debug = require('debug');

const app = express();
const debug = Debug('dev');

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  debug('listening on port 3000');
});
