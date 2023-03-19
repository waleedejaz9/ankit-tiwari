const mongoose = require("mongoose");

const Roles = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    roleName: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "application-role",
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("application-role", Roles);
