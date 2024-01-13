const express = require("express");

const router = express.Router();

router.post("/signup");

router.post('/login');

router.post('/logout');

router.get('/current');


module.exports = router;