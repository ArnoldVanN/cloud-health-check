const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:AnOldVeteran1945@cloudhealthcheckcluster.teisd.mongodb.net/CloudHealthCheckCluster?retryWrites=true&w=majority";
const mongoose = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const db = {};

db.mongoose = mongoose;
db.advisorModel = require("./models/advisor.model.js")

module.exports = db;