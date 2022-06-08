// This schema is based off the arm-advisor ResourceRecommendationBase class
module.exports = mongoose => {
    const Recommendation = mongoose.model(
        "Recommendation",
        mongoose.Schema(
            {
                category: String,
                impact: String,
                impactedField: String,
                impactedValue: String,
                lastUpdated: Date,
                // To be implemented: "metadata" property
                recommendationTypeId: String,
                risk: String,
                shortDescription: {
                    problem: String,
                    solution: String
                },
                resourceMetadata: {
                    resourceId: String,
                    source: String,
                    // To be implemented: "action" property
                    singular: String,
                    plural: String
                },
                description: String,
                label: String,
                learnMoreLink: String,
                potentialBenefits: String
                // To be implemented: "actions" property
                // To be implemented: "remediation" property
                // To be implemented: "exposedMetadataProperties" property
            },
            { timestamps: true }
        )
    );
    return Recommendation;
};