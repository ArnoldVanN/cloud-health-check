const { SecurityCenter } = require("@azure/arm-security");
const db = require('../db')

const AssessmentModel = db.assessmentModel;

exports.getAdvisor = async (subId, cred) => {
    const client = new SecurityCenter(cred, subId)
    assessments = client.assessments.list();
    console.log(assessments)
    // Generate recommendations
    for await (const singleAssess of assessments) {
        const assessment = new AssessmentModel({
            //TODO
        });

        // Save in the database
        console.log('Saved Recommendations to Atlas')
        await assessment.save(assessment);
    }
}

