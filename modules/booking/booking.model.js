const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    work_email: {
      type: String,
    },
    phone: {
      type: String,
    },
    selected_meal: {
      type: String,
    },
    is_confirmed: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  {
    collection: "booking",
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

module.exports = mongoose.model("Booking", BookingSchema);
