const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    date: {
      type: String,
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
    event_detail: {
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
    result: {
      type: Number,
      default: null,
    },
    max_booking: {
      type: Number,
    },
    booking: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Booking",
      },
    ],
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
