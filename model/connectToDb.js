const mongoose = require("mongoose");
const config = require("config");
console.log("con str", config.get("dbConfig.url"));

/* module.exports = mongoose.connect("mongodb://127.0.0.1:27017/businesscard"); */
module.exports = mongoose.connect(config.get("dbConfig.url"));
