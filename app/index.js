#!/usr/bin/env node
const db = require('./db')
const RecommendationModel = db.recommendationModel;

// read in env settings
require('dotenv').config();

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
    db.mongoose.connect(db.uri)

    const subscriptionId = "c5525cab-32a0-4ad4-ae63-bcfe2e44a31e"
    const client = new AdvisorManagementClient(credential, subscriptionId)

    // Generate recommendations
    client.recommendations.generate();
    console.log('Getting list of recommendations')
    // Get list of recommendations from azure advisor
    allRecommendations = client.recommendations.list();
    for await (const singleRec of allRecommendations) {
        const recommendation = new RecommendationModel({
            category: singleRec.category,
            impact: singleRec.impact,
            impactedField: singleRec.impactedField,
            impactedValue: singleRec.impactedValue,
            lastUpdated: singleRec.lastUpdated,
            recommendationTypeId: singleRec.recommendationTypeId,
            risk: singleRec.risk,
            shortDescription: singleRec.shortDescription,
            description: singleRec.description,
            label: singleRec.label,
            learnMoreLink: singleRec.learnMoreLink,
            potentialBenefits: singleRec.potentialBenefits
        });
        // Save in the database
        await recommendation.save(recommendation);
        console.log('Saved Recommendations to Atlas')
    }
    gracefulExit();
};

main();

var gracefulExit = function () {
    db.mongoose.connection.close(function () {
        console.log('Mongoose connection with DB is disconnected through app termination');
        process.exit(0);
    });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
