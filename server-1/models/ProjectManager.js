const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rowData = new Schema({
  task: {
    type: String,
  },

  date: {
    type: Date,
  },
  manager: {
    userID: { type: String },
    value: { type: String },
  },

  due: {
    type: Date,
  },
  status: {
    value: { type: String },
  },

  people: {
    type: [
      {
        userID: { type: String },
        value: { type: String },
      },
    ],
    default: undefined,
  },
  text: {
    type: String,
  },
});

const TableSchema = new Schema({
  workspaceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectWorkspace",
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rowData: [rowData],
});

const WorkspaceSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  accessIDs: [mongoose.Schema.Types.ObjectId],
  name: {
    type: String,
    required: true,
  },
  tables: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectTable",
  }],
});


const ActivitySchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  workspaceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  tableID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectTable",
    required: true,
  },
  userName: {
    type: String,
  },
  task: {
    type: String,
  },
  tableTitle: {
    type: String,
  },
  column: {
    type: String,
  },
  
  activity: {
    type: String,
    enum: ["Group Created", "Table title updated", "Delete Table", "Row data updated","Added new row","Added new column","Row deleted" ,"Column deleted", "Date", "Manager", "Person", "Due","Status"],
  },
  added:{
    type: String,
  },
  deleted:{
    type: String,
  }
  ,
  previous: {
    type: String,
  },
  current: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const lastSeenSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  userName: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

const Table = mongoose.model("ProjectTable", TableSchema);
const Workspace = mongoose.model("ProjectWorkspace", WorkspaceSchema);
const TrackActivity = mongoose.model("ProjectActivity", ActivitySchema);
const LastSeen = mongoose.model("ProjectLastSeen", lastSeenSchema);

module.exports = { Table, Workspace ,TrackActivity,LastSeen};
