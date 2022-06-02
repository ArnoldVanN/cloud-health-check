require('dotenv').config()
const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.ATLAS_USR}:${process.env.ATLAS_PWD}@cloudhealthcheckcluster.teisd.mongodb.net/CloudHealthCheckCluster?retryWrites=true&w=majority`;

// const mongoose = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const db = {};

db.mongoose = mongoose;
db.uri = uri;
db.recommendationModel = require("./models/advisor.model.js")(mongoose)
db.assessmentModel = require("./models/cloudDefender.model.js")(mongoose)

module.exports = db;