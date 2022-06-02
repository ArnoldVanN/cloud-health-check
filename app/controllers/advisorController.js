const { AdvisorManagementClient } = require('@azure/arm-advisor');
const db = require('../db')

const RecommendationModel = db.recommendationModel;

exports.getAdvisor = async (subId, cred) => {
    const client = new AdvisorManagementClient(cred, subId)

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
    }
    console.log('Saved Recommendations to Atlas')
}

