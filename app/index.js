#!/usr/bin/env node

// read in env settings
require('dotenv').config();
require('@azure/arm-advisor')

const fetch = require('./fetch');
const auth = require('./auth');

const { ClientSecretCredential } = require('@azure/identity')
const { AdvisorManagementClient } = require('@azure/arm-advisor');

/**
 *  Authenticate with client secret.
 */
const credential = new ClientSecretCredential(
    process.env.TENANT_ID,
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);


async function main() {
    const subscriptionId = "c5525cab-32a0-4ad4-ae63-bcfe2e44a31e"
    const client = new AdvisorManagementClient(credential, subscriptionId)

    recommendations = client.recommendations.list()
    for await (const recommendation of recommendations) {
        console.log(`Recommendation: ${recommendation.category}`)
    }
    // client.recommendations.list().then((recommendations) => {
    //     console.dir(recommendations, { depth: null, colors: true });
    // });

    // try {
    //     const authResponse = await auth.getToken(auth.tokenRequest);
    //     const users = await fetch.callApi(auth.apiConfig.uri, authResponse.accessToken);
    //     console.log(users);
    //     // insert response into mongodb
    // } catch (error) {
    //     console.log(error);
    // }
};

main();

var gracefulExit = function () {
    mongoose.connection.close(function () {
        console.log('Mongoose connection with DB is disconnected through app termination');
        process.exit(0);
    });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
