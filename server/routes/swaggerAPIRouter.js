const express = require('express');
const router = express.Router();
const swaggerAPIController = require('../controllers/swaggerAPIController');

router.get('/external-data', swaggerAPIController.fetchApiData);

module.exports=router;