const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        contents: {
            type: String,
            required: true,
        },
        token: {
            type: String,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = { Tag };
