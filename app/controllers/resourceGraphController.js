const { ResourceGraphClient } = require("@azure/arm-resourcegraph");
const db = require('../db')

const RecommendationModel = db.recommendationModel;

exports.getResourceGraph = async (subId, cred) => {
    const client = new ResourceGraphClient(cred);
    const result = await client.resources(
        {
            query: argv.query
        },
        { resultFormat: "table" }
    );
    console.log("Records: " + result.totalRecords);
    console.log(result.data);


    // console.log('Getting list of recommendations')
    // // Get list of recommendations from azure advisor
    // allRecommendations = client.recommendations.list();
    // for await (const singleRec of allRecommendations) {

    //     // Save in the database
    //     console.log('Saved Recommendations to Atlas')
    //     await recommendation.save(recommendation);
    // }
};


