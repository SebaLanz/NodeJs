const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.status(200).render('home');
});

// router.get('/api/', (request, response) => {
//     response.status(200).json('products5');
// });

module.exports = router;
