// auth.router.js
const express = require('express');
const GetAuthPageController = require('../controllers/auth.controller');
const router = express.Router();

// GET REQUEST AUTHORIZATION
router.get('/login', GetAuthPageController.showLogin);
router.get('/register', GetAuthPageController.showRegister);

// POST REQUEST AUTHORIZATION
router.post('/login', GetAuthPageController.postlogin);
router.post('/register', GetAuthPageController.postregister);

// GET LOGOUT   
router.get('/logout', GetAuthPageController.onlogout);

module.exports = router;
