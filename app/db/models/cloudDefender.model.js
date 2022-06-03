// This schema is based off the arm-security SecurityAssessmentMetadataResponse class
module.exports = mongoose => {
    const SecurityAssessment = mongoose.model(
        "SecurityAssessment",
        mongoose.Schema(
            {
                id: String,
                displayName: String,
                policyDefinitionId: String,
                description: String,
                remediationDescription: String,
                categories: [String],
                severity: String,
                userImpact: String,
                implementationEffort: String,
                threats: [String],
                preview: Boolean,
                assessmentType: String
            },
            { timestamps: true }
        )
    );
    return SecurityAssessment;
};