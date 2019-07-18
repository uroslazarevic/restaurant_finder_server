const express = require('express');

const { checkAuth } = require('../middleware');
const collection = require('../contollers/collection');

const router = express.Router();

router.post('/collection/save', [checkAuth], collection.save);
router.post('/collection/remove', [checkAuth], collection.remove);
router.post('/collection/load', [checkAuth], collection.load);

module.exports = router;
