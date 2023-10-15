const mongoose = require('mongoose');
const { generateSnowflake } = require('../utils/snowflake_generator');
require('./snowflakeModel'); 
const MemberSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.Snowflake,
        default: () => generateSnowflake(1), 
      },
    community: {
        type: mongoose.Schema.Types.Snowflake,
        ref: "Community",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.Snowflake,
        ref: "User",
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.Snowflake,
        ref: "Role",
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Member", MemberSchema);