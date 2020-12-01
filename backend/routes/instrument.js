const express = require('express');
const router = express.Router();

const { list, create, remove, instrumentById, photo} = require('../controllers/instrumentController');

router.get('/instruments', list);
router.post('/create', create);
router.get('/photo/:instrumentId',photo);
router.delete('/:instrumentId', remove);

router.param("instrumentId", instrumentById);

module.exports = router;