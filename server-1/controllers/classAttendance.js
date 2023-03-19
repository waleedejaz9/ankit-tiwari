const { default: mongoose } = require("mongoose");
const moment = require("moment");
const ClassAttendance = require("../models/ClassAttendance");
const Attendance = require("../models/Attendence");
const dateRange = require("../helper/dateRange");

/**
 *
 * @desc Create attendance Controller
 * @route POST /api/class/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.createClass = async (req, res) => {
  const classData = req.body;
  const classDays = classData.classDays;
  const startDate = classData.startDate;
  const endDate = classData.endDate;
  const classStartTime = classData.classStartTime;
  const classEndTime = classData.classEndTime;
  try {
    const dates = dateRange(startDate, endDate);
    let allAttendance = [];
    seriesId = mongoose.Types.ObjectId();
    if (dates.length > 1) {
      for (let index in dates) {
        let date = dates[index];
        let dayName = moment(new Date(dates[index])).format("dddd");
        if (classDays.includes(dayName)) {
          //let classStartDate = moment(startDate).date(moment(date).date());
          // let classEndDate = moment(endDate).date(moment(date).date());
          let NewClass = {
            ...classData,
            seriesId,
            startDate: date,
            endDate: date,
            classStartTime,
            classEndTime,
            wholeSeriesEndDate: endDate,
            wholeSeriesStartDate: startDate,
          };
          allAttendance.push(NewClass);
        }
      }
    } else if (dates.length === 1) {
      let NewClass = {
        ...classData,
        startDate: startDate,
        endDate: endDate,
        classStartTime,
        classEndTime,
        wholeSeriesEndDate: endDate,
        wholeSeriesStartDate: startDate,
      };
      allAttendance.push(NewClass);
    }
    await ClassAttendance.insertMany(allAttendance)
      .then((result) => {
        res.send({
          msg: "Class scheduled succefully!",
          data: result,
          success: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          errors: { common: { msg: error.message } },
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 *
 * @desc Update attendance Controller
 * @route POST /api/class/update
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.updateClass = async (req, res) => {
  const id = req.body?._id;
  ClassAttendance.findByIdAndUpdate(id, { $set: req.body })
    .then((data) => {
      res.status(200).json({
        success: true,
        msg: "Class successfully updated",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        errors: { common: { msg: error.message } },
      });
    });
};

/**
 *
 * @desc Update updateWholeSeries attendance Controller
 * @route POST /api/class/updateWholeSeries
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.updateWholeSeries = async (req, res) => {
  try {
    const seriesId = req.body?.seriesId;
    const isDateTimeChange = req.body?.isDateTimeChange;
    const classId = req.body?.classId;
    const type = req.body?.type;
    if (isDateTimeChange) {
      // if whole series start or end date is changed then need to delete and reinsert classes
      if (type === 'single') {
        await ClassAttendance.findByIdAndDelete(classId).then((resp) => {
          if (resp.deletedCount < 1) {
            res.status(403).json({
              msg: "Class Id not found!",
              success: false,
            });
          } else {
            reInsertWholeClassSeries(req.body, seriesId, res);
          }
        })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              errors: { common: { msg: err.message } },
            });
          });;
      } else {
        await ClassAttendance.deleteMany({
          $and: [{ seriesId: seriesId }],
        })
          .then((resp) => {
            if (resp.deletedCount < 1) {
              res.status(403).json({
                msg: "series Id not found!",
                success: false,
              });
            } else {
              reInsertWholeClassSeries(req.body, seriesId, res);
            }
          })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              errors: { common: { msg: err.message } },
            });
          });
      }
    } else {
      if (type === 'single') {
        await ClassAttendance.findByIdAndUpdate(
          classId,
          {
            programName: req.body.programName,
            classTitle: req.body.classTitle,
            classStartTime: req.body.classStartTime,
            classEndTime: req.body.classEndTime,
          }
        ).exec((err, updateResp) => {
          if (err) {
            res.send({ msg: "Classes not updated!", success: false });
          } else {
            res.send({
              msg: "This class schedule has been updated Successfully",
              success: true,
            });
          }
        });
      } else if (type === 'all') {
        ClassAttendance.updateMany(
          { seriesId: seriesId },
          {
            programName: req.body.programName,
            classTitle: req.body.classTitle,
            classStartTime: req.body.classStartTime,
            classEndTime: req.body.classEndTime,
          }
        ).exec((err, updateResp) => {
          if (err) {
            res.send({ msg: "Classes not updated!", success: false });
          } else {
            res.send({
              msg: "All class schedule has been updated Successfully",
              success: true,
            });
          }
        });
      }

    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

reInsertWholeClassSeries = async (classData, seriesId, res) => {
  const classDays = classData.classDays;
  const startDate = classData.wholeSeriesStartDate;
  const endDate = classData.wholeSeriesEndDate;
  const classStartTime = classData.classStartTime;
  const classEndTime = classData.classEndTime;
  try {
    const dates = dateRange(startDate, endDate);
    let allAttendance = [];
    if (dates.length > 1) {
      for (let index in dates) {
        let date = dates[index];
        let dayName = moment(new Date(dates[index])).format("dddd");
        if (classDays.includes(dayName)) {
          //let classStartDate = moment(startDate).date(moment(date).date());
          // let classEndDate = moment(endDate).date(moment(date).date());
          let NewClass = {
            ...classData,
            seriesId,
            startDate: date,
            endDate: date,
            classStartTime,
            classEndTime,
            wholeSeriesEndDate: endDate,
            wholeSeriesStartDate: startDate,
          };
          allAttendance.push(NewClass);
        }
      }
    } else if (dates.length === 1) {
      let NewClass = {
        ...classData,
        startDate: endDate,
        endDate: startDate,
        classStartTime,
        classEndTime,
        wholeSeriesEndDate: endDate,
        wholeSeriesStartDate: startDate,
      };
      allAttendance.push(NewClass);
    }
    await ClassAttendance.insertMany(allAttendance)
      .then((result) => {
        res.send({
          msg: "Class scheduled succefully!",
          data: result,
          success: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          errors: { common: { msg: error.message } },
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Get all classes of user
 * @route GET api/class/all/:userId
 * @returns
 */
exports.getClasses = async (req, res) => {
  const { userId } = req.params;
  const currentDate = moment(new Date()).format('YYYY-MM-DD')
  const startMonth = moment(new Date()).startOf('month')
  const endMonth = moment(new Date()).endOf('month')
  const startYear = moment(new Date()).startOf('year')
  const endYear = moment(new Date()).endOf('year')
  try {
    const classes = await ClassAttendance.find({ userId });
    const dayClasses = await ClassAttendance.find({
      userId,
      startDate: { $eq: currentDate }
    })
    const monthClasses = await ClassAttendance.find({
      userId,
      wholeSeriesStartDate: { $gte: startMonth, $lte: endMonth }
    })
    const yearClasses = await ClassAttendance.find({
      userId,
      wholeSeriesStartDate: { $gte: startYear, $lte: endYear }
    })
    return res.status(200).json({
      success: true,
      data: {
        classes,
        dayClasses,
        monthClasses,
        yearClasses
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Get information of a class
 * @route GET api/class/info/:classId
 * @return
 */
exports.getClassInfo = async (req, res) => {
  const { classId } = req.params;
  try {
    const classEvent = await ClassAttendance.findById(classId);
    if (!classEvent) {
      res.status(404).json({ msg: "Not Found" });
    }
    return res.status(200).json(classEvent);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Delete a Class by class Id
 * @route GET api/class/info/:classId
 * @return
 */
exports.deleteClass = async (req, res) => {
  const { classId, type } = req.params;
  try {
    if (type === "single") {
      await ClassAttendance.findByIdAndDelete(classId);
      return res.status(200).json({ success: true, msg: "Successfully deleted" });
    }

    if (type === "all") {
      ClassAttendance.deleteMany({
        $and: [{ seriesId: classId }],
      })
        .then((resp) => {
          if (resp.deletedCount < 1) {
            res.status(403).json({
              msg: "series Id not found!",
              success: false,
            });
          } else {
            return res.status(200).json({ success: true, msg: "Successfully deleted" });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            errors: { common: { msg: err.message } },
          });
        });
    }
  } catch (err) {
    return res.status(404).json({ success: false, errors: { common: { msg: err.message } } });
  }
};

/**
 * @desc Create a Class mark-attendance by class Id
 * @route GET api/class/mark-attendance
 * @return
 */
exports.markAttendance = async (req, res) => {
  const { classId, contactId } = req.body;
  const newAttendance = new Attendance({ ...req.body });
  try {
    const attendanceData = await Attendance.findOne({
      classId: classId,
      contactId: contactId,
    });

    if (attendanceData) {
      return res.status(500).json({
        errors: { common: { msg: "Attendance marked already for student" } },
      });
    } else {
      newAttendance
        .save()
        .then((data) => {
          return res.status(200).json({ success: true, msg: "Successfully added" });
        })
        .catch((error) => {
          return res.status(500).json({
            errors: { common: { msg: error.message } },
          });
        });
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Create a Class mark-attendance by class Id
 * @route GET api/class/mark-attendance
 * @return
 */
exports.getAttendance = async (req, res) => {
  const { classId } = req.params;
  try {
    const attendees = await Attendance.find({ classId });
    return res.status(200).json({
      success: true,
      data: attendees,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Delete a Attendance by attendance Id
 * @route GET api/class/info/:attendanceId
 * @return
 */
exports.deleteAttendance = async (req, res) => {
  const { attendanceId } = req.params;
  try {
    await Attendance.findByIdAndDelete(attendanceId);
    return res.status(200).json({ success: true, msg: "Successfully deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
  }
};
