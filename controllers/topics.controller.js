const { fetchTopics } = require('../models/model');
const fs = require('fs');
const path = require('path');

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      console.error('Error in getTopics:', err); 
      next(err); 
    });
};

exports.getAllEndpoints = (req, res, next) => {
  const endpointsPath = path.join(__dirname, '../endpoints.json');
  fs.readFile(endpointsPath, 'utf8', (err, data) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send(JSON.parse(data));
    }
  });
};
