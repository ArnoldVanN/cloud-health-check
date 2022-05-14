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
                recommendationTypeId: String,
                risk: String,
                shortDescription: {
                    problem: String,
                    solution: String
                },
                description: String,
                label: String
            },
            { timestamps: true }
        )
    );
    return Recommendation;
};