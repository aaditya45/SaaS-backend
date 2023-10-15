const mongoose = require('mongoose');

class Snowflake extends mongoose.SchemaType {
  constructor(key, options) {
    super(key, options, 'Snowflake');
  }

  cast(val) {
    if (val == null || val instanceof String || val instanceof Number) {
      return val;
    }

    if (typeof val === 'string' || typeof val === 'number') {
      return String(val);
    }

    throw new Error('Snowflake: Invalid type');
  }
}

mongoose.Schema.Types.Snowflake = Snowflake;
