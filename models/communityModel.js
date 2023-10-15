const mongoose = require('mongoose');
const { generateSnowflake } = require('../utils/snowflake_generator');
var URLSlug = require("mongoose-slug-generator");
require('./snowflakeModel'); 
mongoose.plugin(URLSlug);

const communityModelSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.Snowflake,
        default: () => generateSnowflake(1),
    },
    name: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 2,
    },
    owner: {
        type: mongoose.Schema.Types.Snowflake,
        ref: "User",
        required: true,
    },
    slug: {
        type: String,
        slug: "name",
    }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Community", communityModelSchema);