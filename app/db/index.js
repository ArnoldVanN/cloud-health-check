require('dotenv').config()
const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;
db.recommendationModel = require("./models/advisor.model.js")(mongoose)
db.assessmentModel = require("./models/cloudDefender.model.js")(mongoose)

module.exports = db;