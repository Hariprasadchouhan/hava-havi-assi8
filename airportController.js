
const AppDataSource = require('../database');
const Airport = require('../entity/Airport');

exports.getAirportByIataCode = async (req, res) => {
  const iata_code = req.params.iata_code;

  try {
    const airportRepo = AppDataSource.getRepository(Airport);
    const airport = await airportRepo.findOne({
      where: { iata_code },
      relations: ['city', 'country'],
    });

    if (!airport) {
      return res.status(404).json({ message: 'Airport not found' });
    }

    const response = {
      airport: {
        id: airport.id,
        icao_code: airport.icao_code,
        iata_code: airport.iata_code,
        name: airport.name,
        type: airport.type,
        latitude_deg: airport.latitude_deg,
        longitude_deg: airport.longitude_deg,
        elevation_ft: airport.elevation_ft,
        address: {
          city: {
            id: airport.city.id,
            name: airport.city.name,
            country_id: airport.city.country_id,
            is_active: airport.city.is_active,
            lat: airport.city.lat,
            long: airport.city.long,
          },
          country: airport.country ? {
            id: airport.country.id,
            name: airport.country.name,
            country_code_two: airport.country.country_code_two,
            country_code_three: airport.country.country_code_three,
            mobile_code: airport.country.mobile_code,
            continent_id: airport.country.continent_id,
          } : null,
        },
      },
    };

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
