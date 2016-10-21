'use strict';

var express = require('express');
var controller = require('./process.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/overall/:id', controller.overall);
router.get('/:id/:workstation', controller.show);
router.get('/next5/:id/:workstation', controller.next5);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
