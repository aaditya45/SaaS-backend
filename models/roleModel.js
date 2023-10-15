const mongoose = require('mongoose');
const { generateSnowflake } = require('../utils/snowflake_generator');
require('./snowflakeModel'); 

const RoleSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.Snowflake,
        default: () => generateSnowflake(1),
      },
    name: {
        type: String,
        required: true,
        minlength: 2,
        unique: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Role', RoleSchema);