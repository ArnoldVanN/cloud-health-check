module.exports = mongoose => {
    const Advisor = mongoose.model(
        "advisor",
        mongoose.Schema(
            {
                title: String,
                // implement model for advisor response
            },
            { timestamps: true }
        )
    );
    return Advisor;
};