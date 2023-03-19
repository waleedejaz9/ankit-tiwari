const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { CourseQuiz, CourseQuizSolution } = require("../models/index/index");

exports.createQuiz = asyncHandler(async (req, res) => {
  const payload = req.body;
  payload.userId = req.user._id;
  payload.courseId = req.params.id;
  console.log(payload);
  try {
    const quiz = await CourseQuiz.create(payload);
    if (quiz) {
      return res.status(200).json({
        message: "Quiz Added",
        success: true,
        quiz,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getQuizByCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await CourseQuiz.find(
      { courseId: mongoose.Types.ObjectId(id) },
      { solution: false, __v: false }
    );
    if (quiz) {
      return res.status(200).json(quiz);
    } else {
      return res.status(404).json({
        success: false,
        message: "No quiz found for this course",
      });
    }
  } catch (error) {
    return res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.submitQuizSolution = asyncHandler(async (req, res) => {
  try {
    const { answer } = req.body;
    const { id: courseId, quizId } = req.params;
    const { _id: learnerId } = req.user;
    const payload = {
      courseId,
      quizId,
      learnerId,
      answer,
    };
    const submitted = await CourseQuizSolution.create(payload);
    if (submitted) {
      return res.status(201).json({ success: true });
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.checkQuizSolution = asyncHandler(async (req, res) => {
  const { id, quizId } = req.params;
  let { answer } = req.body;
  answer = answer.trim();
  try {
    const quiz = await CourseQuiz.findOne({
      courseId: mongoose.Types.ObjectId(id),
      quizId: mongoose.Types.ObjectId(quizId),
      solution: { $regex: answer, $options: "i" },
    });
    if (quiz) {
      return res.status(200).json({ isAnswerCorrect: true });
    } else {
      return res.status(200).json({ isAnswerCorrect: false });
    }
  } catch (error) {
    return res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});
