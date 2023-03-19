// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const FormBuilder = require("../models/FormBuilder");
const LeadContact = require("../models/LeadContact");

/**
 *
 * @desc Create formBuilder Controller
 * @route POST /api/formBuilder/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.createForm = async (req, res) => {
  try {
    
    const payload = {...req.body,userId: mongoose.Types.ObjectId(req.user._id)}
    const data = await FormBuilder.create(payload);
    
    return res.send({
      success: true,
      message: "Form created successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getForm = async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const data = await FormBuilder.findById(id);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    res.send({ msg: "error" });
  }
};
exports.getForms = async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const data = await FormBuilder.find({"userId":id});
    return res.status(200).json({ success: true, data });
  } catch (err) {
    res.send({ msg: "error" });
  }
};

exports.deleteForm = async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    await FormBuilder.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
};
// exports.deleteAll = async (req, res) => {
//   //let { id } = req.params;
//   try {
//     //id = mongoose.Types.ObjectId(id);
//     await FormBuilder.deleteMany();
//     res.status(200).json({ success: true });
//   } catch (err) {
//     res.send({ msg: err.message.replace(/\'/g, ""), success: false });
//   }
// };

exports.editForm = async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const data = await FormBuilder.findByIdAndUpdate(id, req.body, { new: true });
    if (data) {
      return res.send({ success: true, data });
    }
    return res.status(404).json({ success: false, message: `Form with id: ${id} not found` });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
};

exports.addLeads = asyncHandler(async (req, res) => {
  const {id} = req.params // formId
 

  //get userId of form
  const form = await FormBuilder.findById(mongoose.Types.ObjectId(id))
  if (!form) {
    throw Error("No such form found !");
  }
  const userId = form.userId
  
  const payload = {...req.body,userId,formId:id}
  //Check phone exist or not
  if (payload?.phone !== "") {
    const checkExist = await LeadContact.findOne({
      phone:payload.phone,userId
    });
    
    if (checkExist) {
      throw Error("Phone number already Exist");
    }
  }
  // // Check Email exist or not
  if (payload?.email !== "") {
    const checkExist = await LeadContact.findOne({
      email:payload.email,userId
    });
    if (checkExist) {
      throw Error("Email already Exist");
    }
  }

  const leadContact = new LeadContact(payload);
  // validation
  if (!req.body.fullName || req.body.fullName === "") {
    throw Error("Full name must not empty !");
  }


  // eslint-disable-next-line no-unused-vars
  leadContact.save((err, success) => {
    if (err) {
      if (err) {
        throw Error(err);
      }
    } else {
      return res.status(201).json({
        success: "Client contact created successfull",
      });
    }
  });
});
