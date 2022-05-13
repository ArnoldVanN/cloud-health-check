#!/usr/bin/env node
const db = require('./db')
const controllers = require('./controllers')

// read in env settings
require('dotenv').config();

const { ClientSecretCredential } = require('@azure/identity')

const subscriptionId = process.env.SUBSCRIPTION_ID

/**
 *  Authenticate with client secret.
 */
const credential = new ClientSecretCredential(
    process.env.TENANT_ID,
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);

async function main() {
    db.mongoose.connect(db.uri)
    console.log('Opened connection to database')

    // await controllers.getAdvisor(subscriptionId, credential)
    await controllers.getAssessments(subscriptionId, credential)

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
