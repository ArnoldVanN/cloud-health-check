module.exports = mongoose => {
    const SecurityAssessment = mongoose.model(
        "SecurityAssessment",
        mongoose.Schema(
            {
                category: String,

            },
            { timestamps: true }
        )
    );
    return SecurityAssessment;
};