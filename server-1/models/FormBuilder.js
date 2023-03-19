// declare mongoose
const mongoose = require("mongoose");

const FormBuilderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    memberType: {
      type: String,
      required: true,
    },
    automateEntry: {
      type: Boolean,
      required: true,
    },
    smartList: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    formType: {
      type: String,
      required: true,
    },
    formData: {
      type: Object,
    },
    clonedFrom: {
      type: mongoose.Types.ObjectId,
    },
    status: {
      type: String,
    },
    templateId: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Form-builder", FormBuilderSchema);
