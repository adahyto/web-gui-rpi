const express = require('express');
const router = express.Router();

router.all('/*', (req, res, next)=>{
  req.app.locals.layout = 'main';
  next();
});

router.get('/', (req, res) => {
    res.render('leds/index');
});

module.exports = router;
