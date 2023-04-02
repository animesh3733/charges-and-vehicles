const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/get-chargers', (req, res) => {
  axios.get('https://raw.githubusercontent.com/animesh3733/charges-and-vehicles/main/chargers.json')
      .then((response) => {
        const data = response.data;
        res.json(data);
      })
      .catch((error) => {
        console.error('Error fetching JSON data from GitHub link');
        res.status(500).send('Error fetching JSON data from GitHub link');
      });
});

module.exports = router;
