
const { Workbook } = require('exceljs');
const AppDataSource = require('../database');
const Airport = require('../entity/Airport');
const City = require('../entity/City');
const Country = require('../entity/Country');

async function importData() {
  const workbook = new Workbook();
  await workbook.xlsx.readFile('./Database.xlsx');

  const airportSheet = workbook.getWorksheet('Airport');
  const citySheet = workbook.getWorksheet('City');
  const countrySheet = workbook.getWorksheet('Country');

  const countryRepo = AppDataSource.getRepository(Country);
  const cityRepo = AppDataSource.getRepository(City);
  const airportRepo = AppDataSource.getRepository(Airport);

  // Import Countries
  const countries = [];
  countrySheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const country = {
        name: row.getCell(2).value,
        country_code_two: row.getCell(3).value,
        country_code_three: row.getCell(4).value,
        mobile_code: row.getCell(5).value,
        continent_id: row.getCell(6).value,
      };
      countries.push(country);
    }
  });
  await countryRepo.save(countries);

  // Import Cities
  const cities = [];
  citySheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const city = {
        name: row.getCell(2).value,
        country_id: row.getCell(3).value,
        is_active: row.getCell(4).value,
        lat: row.getCell(5).value,
        long: row.getCell(6).value,
      };
      cities.push(city);
    }
  });
  await cityRepo.save(cities);

  // Import Airports
  const airports = [];
  airportSheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const airport = {
        icao_code: row.getCell(2).value,
        iata_code: row.getCell(3).value,
        name: row.getCell(4).value,
        type: row.getCell(5).value,
        latitude_deg: row.getCell(6).value,
        longitude_deg: row.getCell(7).value,
        elevation_ft: row.getCell(8).value,
        city: row.getCell(9).value,
        country: row.getCell(10).value,
      };
      airports.push(airport);
    }
  });
  await airportRepo.save(airports);

  console.log('Data imported successfully');
}

importData();
