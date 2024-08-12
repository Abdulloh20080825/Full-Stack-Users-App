const express = require('express');
const router = express.Router();
const MainPageController = require('../controllers/MainPageController');

router.get('/', MainPageController.mainPage);

router.get('/all-users', MainPageController.getAllUsers)

module.exports = router;
