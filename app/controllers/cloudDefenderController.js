const { SecurityCenter } = require("@azure/arm-security");
const db = require('../db')

const AssessmentModel = db.assessmentModel;

exports.getAssessments = async (subId, cred) => {
    const client = new SecurityCenter(cred, subId)
    assessments = client.assessments.list(`/subscriptions/${subId}`);
    for await (const singleAssess of assessments) {
        // Get the resource ID of every SecurityAssessmentResponse
        resourceId = await singleAssess.resourceDetails.Id;
        // Get the Unique key for the assessment type
        assessmentKey = await singleAssess.name;
        // Get detailed information about a SecurityAssessmentResponse
        detailedAssessment = await client.assessmentsMetadata.get(assessmentKey)
        // detailedAssessment = await client.assessments.get(resourceId, assessmentKey);
        const assessment = new AssessmentModel({
            id: resourceId,
            displayName: detailedAssessment.displayName,
            policyDefinitionId: detailedAssessment.policyDefinitionId,
            description: detailedAssessment.description,
            remediationDescription: detailedAssessment.remediationDescription,
            categories: detailedAssessment.categories,
            severity: detailedAssessment.severity,
            userImpact: detailedAssessment.userImpact,
            implementationEffort: detailedAssessment.implementationEffort,
            threats: detailedAssessment.threats,
            preview: detailedAssessment.preview,
            assessmentType: detailedAssessment.assessmentType
        });

        // Save in the database
        await assessment.save(assessment);
    }
    console.log('Saved Security Assessments to Atlas')
}

