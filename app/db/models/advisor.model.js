module.exports = mongoose => {
    const Advisor = mongoose.model(
        "advisor",
        mongoose.Schema(
            {
                // implement model for advisor response
            },
            { timestamps: true }
        )
    );
    return Advisor;
};