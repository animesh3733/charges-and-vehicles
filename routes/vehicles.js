const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/get-vehicles', (req, res) => {
  axios.get('https://raw.githubusercontent.com/animesh3733/charges-and-vehicles/main/vehicles.json')
      .then((response) => {
        const data = response.data;
        res.json(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error fetching JSON data from GitHub link');
      });
});

module.exports = router;
