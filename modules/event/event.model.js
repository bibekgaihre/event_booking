const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    date: {
      type: Date,
    },
    location: {
      type: String,
    },
    comment: {
      type: String,
    },
    sponsor_name: {
      type: String,
    },
    sponsor_address: {
      type: String,
    },
    sponsor_logo: {
      type: String,
    },
    meal_option: {
      type: [
        {
          text: {
            type: String,
          },
          image: {
            type: String,
          },
        },
      ],
      min: 1,
      max: 3,
    },
    max_booking: {
      type: Number,
    },
    booking: {
      type: mongoose.Schema.ObjectId,
      ref: "Booking",
    },
  },
  {
    collection: "event",
    timeStamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toObject: {
      virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Event", EventSchema);
