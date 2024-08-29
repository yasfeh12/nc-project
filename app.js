const express = require('express');
const apiRouter = require('./routes'); 
const app = express();

app.use(express.json());
app.use('/api', apiRouter);

app.use((req, res, next) => {
  res.status(404).send({ msg: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({ msg: err.message || 'Internal Server Error' });
});

module.exports = app;
