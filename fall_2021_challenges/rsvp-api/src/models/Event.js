const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    event_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    participants: [
        {
            name: {
                type: String,
                required: true,
            },
        },
    ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
