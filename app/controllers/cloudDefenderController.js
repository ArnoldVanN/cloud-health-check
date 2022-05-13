const { SecurityCenter } = require("@azure/arm-security");
const db = require('../db')

const AssessmentModel = db.assessmentModel;

exports.getAssessments = async (subId, cred) => {
    const client = new SecurityCenter(cred, subId)
    assessments = client.assessments.list(`/subscriptions/${subId}`);
    // client.assessments.get()
    for await (const singleAssess of assessments) {
        console.log(singleAssess)
        const assessment = new AssessmentModel({
            //TODO implement schema properties
        });

        // Save in the database
        console.log('Saved Security Assessments to Atlas')
        await assessment.save(assessment);
    }
}

