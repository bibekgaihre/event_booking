const mongoose = require("mongoose");

const GeneralSchema = mongoose.Schema(
  {
    app_store_link: {
      type: String,
    },
    play_store_link: {
      type: String,
    },
    image: {
      type: String,
    },
    overlay_text: {
      type: String,
    },
  },
  {
    collection: "general",
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
module.exports = mongoose.model("General", GeneralSchema);
