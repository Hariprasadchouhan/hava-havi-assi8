
const express = require('express');
const bodyParser = require('body-parser');
const airportController = require('./controller/airportController');
require('./database'); // Initialize database

const app = express();
app.use(bodyParser.json());

app.get('/airport/:iata_code', airportController.getAirportByIataCode);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
