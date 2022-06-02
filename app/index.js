#!/usr/bin/env node
const db = require('./db')
const controllers = require('./controllers')

// read in env settings
require('dotenv').config();

const { ClientSecretCredential } = require('@azure/identity')
const { ResourceGraphClient } = require("@azure/arm-resourcegraph");

/**
 *  Authenticate with client secret.
 */
const credential = new ClientSecretCredential(
    process.env.TENANT_ID,
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);

async function getSubscriptions(cred) {
    const client = new ResourceGraphClient(cred);
    const result = await client.resources(
        {
            query: 'resourcecontainers | where type == "microsoft.resources/subscriptions"'
        },
        { resultFormat: "table" }
    );

    var subscriptionDatas = result.data;
    var subscriptionIds = [];
    for await (sub of subscriptionDatas) {
        subscriptionIds.push(sub.subscriptionId)
    }
    return subscriptionIds;
}

async function main() {
    console.log('Opened connection to database')
    var subscriptionIds = await getSubscriptions(credential)

    for (subscriptionId of subscriptionIds) {
        // Create new database for each subscription
        const uri = `mongodb+srv://${process.env.ATLAS_USR}:${process.env.ATLAS_PWD}@cloudhealthcheckcluster.teisd.mongodb.net/${subscriptionId}?retryWrites=true&w=majority`;
        db.mongoose.connect(uri)
        // Collect recommendations from Azure Advisor
        await controllers.getAdvisor(subscriptionId, credential)
        // Collect security assessments from Azure Cloud Defender
        await controllers.getAssessments(subscriptionId, credential)
        
        db.mongoose.connection.close();
    }
    // Close DB connection and exit program
    gracefulExit();
};

var gracefulExit = function () {
    db.mongoose.connection.close(function () {
        console.log('Mongoose connection with DB is disconnected through app termination');
        process.exit(0);
    });
}

main();

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
