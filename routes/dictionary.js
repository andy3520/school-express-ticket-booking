const data = require('../resource/dictionary.json')
var express = require('express');
var router = express.Router();

// dictionary data
router.get('/', function(req, res) {
  res.json(data)
});

module.exports = router;
