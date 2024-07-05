
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'City',
  tableName: 'city',
  columns: {
    id: { primary: true, type: 'int', generated: true },
    name: { type: 'varchar' },
    country_id: { type: 'int' },
    is_active: { type: 'boolean' },
    lat: { type: 'float' },
    long: { type: 'float' },
  },
});
