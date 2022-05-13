module.exports = mongoose => {
    const Security = mongoose.model(
        "Security",
        mongoose.Schema(
            {
                category: String,

            },
            { timestamps: true }
        )
    );
    return Security;
};