const mongoose = require("mongoose");

const schema = mongoose.Schema;
const membershipsalesSchema = schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    membershipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "membership",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("membershipsales", membershipsalesSchema);