
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Airport',
  tableName: 'airport',
  columns: {
    id: { primary: true, type: 'int', generated: true },
    icao_code: { type: 'varchar' },
    iata_code: { type: 'varchar' },
    name: { type: 'varchar' },
    type: { type: 'varchar' },
    latitude_deg: { type: 'float' },
    longitude_deg: { type: 'float' },
    elevation_ft: { type: 'int' },
  },
  relations: {
    city: {
      type: 'many-to-one',
      target: 'City',
      joinColumn: true,
      eager: true,
    },
    country: {
      type: 'many-to-one',
      target: 'Country',
      joinColumn: true,
      eager: true,
    },
  },
});
