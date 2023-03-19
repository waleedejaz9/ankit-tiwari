const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const { Invoice } = require("../models/index/index");

exports.createInvoice = asyncHandler(async (req, res) => {
  try {
    let { _id: userId } = req.user;
    userId = mongoose.Types.ObjectId(userId);
    var url = "";
    const { bank, items } = req.body;
    let newObj = Object.assign({}, req.body, { bank: JSON.parse(bank), 'items': JSON.parse(items) })
    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
    }
    const tax = newObj.tax || 0;
    const discount = newObj.discount || 0;

    const lastInvoice = await Invoice.findOne({}, {}, { sort: { createdAt: -1 } });
    let no = 0;
    if (lastInvoice) {
      no = (Number(lastInvoice.no) + 1).toString();
    }
    const subTotal = newObj.items.reduce((total, item) => total + item.quantity * item.rate, 0);
    let totalAmount = subTotal - subTotal * discount;
    totalAmount += subTotal * tax;
    const payload = {
      userId,
      logoUrl: url,
      no,
      totalAmount,
      ...newObj,
    };
    await Invoice.create(payload);
    return res.status(201).send({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getInvoices = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    //  let invoices = await Invoice.find({ userId: _id });
    let invoices = await Invoice.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(_id),
          isDelete: false,
        },
      },
      {
        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          as: "customer",
          pipeline: [{ $project: { fullName: 1, email: 1, address: 1, contact: 1 } }],
        },
      },
    ]);
    invoices = invoices.map((i) => {
      const paidAmount = i.paidAmount || 0;
      const balance = i.totalAmount > paidAmount ? i.totalAmount - paidAmount : 0;
      // return { ...i.toObject({ versionKey: false }), balance };
      i["balance"] = balance;
      return i;
    });
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let invoice = await Invoice.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
          isDelete: false,
        },
      },
      {
        // $lookup: {
        //   from: "customers",
        //   localField: "customerId",
        //   foreignField: "_id",
        //   as: "customer",
        //   pipeline: [
        //     {
        //       $project: {
        //         fullName: 1,
        //         email: 1,
        //         contact: 1,
        //         address: 1,
        //       },
        //     },
        //   ],
        // },

        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          as: "customer",
          pipeline: [{ $project: { fullName: 1, email: 1, address: 1, contact: 1 } }],
        },
      },
    ]);
    if (invoice.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      invoice = invoice[0];
      const paidAmount = invoice.paidAmount || 0;
      const balance = invoice.totalAmount > paidAmount ? invoice.totalAmount - paidAmount : 0;
      invoice = { ...invoice, balance };
      return res.status(200).json(invoice);
    }
    return res.status(404).json({ success: false, msg: "Not found" });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let payload = req.body;
    const invoice = await Invoice.findOne({ _id: mongoose.Types.ObjectId(id) });
    if (invoice.totalAmount <= invoice.paidAmount) {
      payload = { ...payload, status: "PAID" };
    }
    await invoice.update(payload);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // const data = await Invoice.findByIdAndDelete(mongoose.Types.ObjectId(id));
    // if (data !== null) return res.status(200).send({ success: true, msg: "Delete invoice" });
    // return res
    //   .status(404)
    //   .json({ success: false, msg: `Invoice with id ${id} not found hence not deleted` });

    const invoice = await Invoice.findOne({ _id: mongoose.Types.ObjectId(id) });

    await invoice.update({ isDelete: true });
    return res.status(200).json({
      success: true,
      msg: "Delete invoice successfully.",
    });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.sendInvoiceEmail = asyncHandler(async (req, res) => {
  try {
    // console.log(req.body);
    // const { from, fullName, to, taskName, subTaskName, content, isUpload, isComplete } = req.body;
    // const emailBody = documentEmailTemplate({
    //   type: `new`,
    //   senderName: fullName,
    //   docLink: content,
    //   senderEmail: from,
    //   recipientName: "Recipient",
    //   message: `${taskName}/${subTaskName} is completed.`,
    // });
    // SendMail({
    //   from: `${fullName} via MyManager <hello@mymanager.com>`,
    //   recipient: "glassespiger@gmail.com",
    //   subject: `New proof message from ${from}`,
    //   body: emailBody,
    //   replyTo: from,
    // });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.filterInvoice = asyncHandler(async (req, res) => {
  try {
    let filter = req.params.TypeOfDate;
    let dateObj = {};
    switch (filter) {
      case "this-month":
        dateObj = [
          {
            $month: "$createdAt",
          },
          {
            $month: new Date(),
          },
        ];
        break;
      case "this-week":
        dateObj = [
          {
            $week: "$createdAt",
          },
          {
            $week: new Date(),
          },
        ];
        break;
      case "next-month":
        var d = new Date();
        d.setMonth(d.getMonth() + 1, 1);
        nextMonth = new Date(d);

        dateObj = [
          {
            $month: "$createdAt",
          },
          {
            $month: nextMonth,
          },
        ];
        break;
      default:
        throw new Error("No date value found!");
    }
    const { _id } = req.user;
    let invoices = await Invoice.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(_id),
          $expr: {
            $eq: dateObj,
          },
        },
      },
      {
        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          as: "customer",
          pipeline: [{ $project: { fullName: 1, email: 1, address: 1, contact: 1 } }],
        },
      },
    ]);
    invoices = invoices.map((i) => {
      const paidAmount = i.paidAmount || 0;
      const balance = i.totalAmount > paidAmount ? i.totalAmount - paidAmount : 0;
      i["balance"] = balance;
      return i;
    });
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.filterByStatusInvoice = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    let text = req.params.statusType;
    let regex = new RegExp(text, "i");
    let invoices = await Invoice.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(_id),
          $or: [{ status: regex }],
        },
      },
      {
        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          as: "customer",
          pipeline: [{ $project: { fullName: 1, email: 1, address: 1, contact: 1 } }],
        },
      },
    ]);
    invoices = invoices.map((i) => {
      const paidAmount = i.paidAmount || 0;
      const balance = i.totalAmount > paidAmount ? i.totalAmount - paidAmount : 0;
      i["balance"] = balance;
      return i;
    });
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.searchTextInvoice = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    let search = req.query.search;
    let regex = new RegExp(search, "i");
    let invoices = await Invoice.aggregate([
      {
        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          as: "customer",
          pipeline: [{ $project: { fullName: 1, email: 1, address: 1, contact: 1 } }],
        },
      },
      {
        $match: {
          userId: mongoose.Types.ObjectId(_id),
          customer: {
            $elemMatch: {
              $or: [
                {
                  fullName: {
                    $regex: regex,
                    $options: "i",
                  },
                },
                {
                  email: {
                    $regex: regex,
                    $options: "i",
                  },
                },
              ],
            },
          },
        },
      },
    ]);
    invoices = invoices.map((i) => {
      const paidAmount = i.paidAmount || 0;
      const balance = i.totalAmount > paidAmount ? i.totalAmount - paidAmount : 0;
      i["balance"] = balance;
      return i;
    });
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});
