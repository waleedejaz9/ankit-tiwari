const mongoose = require("mongoose");
const schema = mongoose.Schema;

const courseLesson = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    courseId:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
    },
    lessonName: {
      type: String,
      trim: true,
    },
    videoId: [
      {
        type: schema.Types.ObjectId,
        ref: "courseVideo",
      },
    ],
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("courseLesson", courseLesson);
