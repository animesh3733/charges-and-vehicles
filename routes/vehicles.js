const express = require('express');
const router = express.Router();
const axios = require('axios');

/* istanbul ignore next */
router.get('/get-vehicles', (req, res) => {
  axios.get('https://raw.githubusercontent.com/ppadmaprasadshenoy/charges-and-vehicles/main/routes/vehicles.js')
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
