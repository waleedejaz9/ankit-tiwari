const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { FinanceCategory } = require("../models/index/index");

exports.createFinanceCategory = asyncHandler(async (req, res) => {
  try {
    const payload = req.body;
    payload.userId = mongoose.Types.ObjectId(req.user._id);
    const expenseCategoryData = await FinanceCategory.create(payload);
    return res.status(201).send(expenseCategoryData);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getFinanceCategory = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    let expenseCategoryData = await FinanceCategory.find({
      userId: mongoose.Types.ObjectId(_id),
    });
    console.log(expenseCategoryData);
    return res.status(200).json(expenseCategoryData);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.deleteFinanceCategoryById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await FinanceCategory.findOneAndDelete({
      _id: mongoose.Types.ObjectId(id),
      userId: mongoose.Types.ObjectId(req.user._id),
    });
    if (category === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Delete category successfully.",
    });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
