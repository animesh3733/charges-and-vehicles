const express = require('express');

const chargers = require('./routes/chargers');
const vehicles = require('./routes/vehicles');
const app = express();

app.use('/chargers', chargers);
app.use('/vehicles', vehicles);

app.listen(3000);
