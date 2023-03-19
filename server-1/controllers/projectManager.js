const { ObjectId } = require("mongodb");
const { Table, Workspace, TrackActivity, LastSeen } = require("../models/ProjectManager");

//** Create Prject Management Workspace  */

exports.createProject = async (req, res) => {
  try {
    let { name } = req.body;
    userID = req.user._id;
    if (!userID || !name) {
      return res.status(400).json({
        response: false,
        massage: "userID and workspace name are required to create new worksapce",
      });
    }

    let newWorksapce = new Workspace({
      userID,
      accessIDs: [],
      name,
      tables: [],
    });

    await newWorksapce.save();
    Workspace.find({
      $or: [{ userID: userID }, { accessIDs: { $in: userID } }],
    })
      .populate("tables")
      .exec(async (error, result) => {
        if (error) {
          return res.status(400).json({
            success: false,
            massage: "Error while searching for data",
          });
        } else {

          res.status(200).json({ success: true, result });
        }
      });
  } catch (error) {
    res.status(500).json({
      respnse: false,
      massage: "Failed to create workspace",
    });
  }
};


exports.getProjects = async (req, res) => {
  try {
    const id = req.query.id;
    let userID = req.user._id
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "userID are required in the request body",
      });
    }
    Workspace.find({
      $or: [{ userID: id }, { accessIDs: { $in: id } }],
    })
      .populate("tables")
      .exec(async (error, result) => {
        if (error) {
          return res.status(400).json({
            success: false,
            massage: "Error while searching for data",
          });
        } else {

          res.status(200).json({ success: true, result });
        }
      });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// //** Delete Table
exports.deleteProject = async (req, res) => {
  try {
    let projectID = req.query.id;
    let userID = req.user._id
    if (!projectID) {
      return res.status(400).json({
        success: false,
        message: "projectID are required",
      });
    }

    const deletedProject = await Workspace.findByIdAndDelete(projectID);
    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "The requested project management data could not be found.",
      });
    }

    const workspaces = await Workspace.find({
      $or: [{ userID: userID }, { accessIDs: { $in: [userID] } }],
    });


    return res.status(200).json({
      success: true,
      data: workspaces,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the project management data",
      error: err,
    });
  }
};

exports.updateProjectTitle = async(req,res) => {
  try{
    let {projectTitle , workspaceID}= req.body;
    await Workspace.updateOne({_id:workspaceID},{ $set: { name: projectTitle } }).then((result)=>{
      if(result){
        
    return res.status(201).json({
      success: true,
    });
      }

     })
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating project title",
      error: err,
    });

  }
}

// //** Create new table
exports.addProjectManagement = async (req, res) => {
  try {
    const { workspaceID, title } = req.body;
    let userID = req.user._id;
    let userName = req.user.firstName;
    if (!workspaceID || !userID || !title) {
      return res.status(400).json({
        success: false,
        message: "Faield to add new table",
      });
    }

    const newTable = new Table({
      workspaceID,
      userID,
      title,
      rowData: [],
    });

    let tableAdded = await newTable.save();

    const workspace = await Workspace.findById(workspaceID);
    workspace.tables.push(tableAdded._id);
    await workspace.save();

    let newActivity = new TrackActivity({
      userID:userID,
      userName: userName,
      workspaceID: workspaceID,
      tableTitle: title,
      tableID: tableAdded._id,
      activity: "Group Created",
      current: title,
    });
    await newActivity.save();

    return res.status(201).json({
      success: true,
      data: tableAdded,

    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the New Table",
      error: err,
    });
  }
};


// //** Update Table data
exports.updateProjectManagement = async (req, res) => {
  try {
    const { tableID, rowID, title, rowData, columnType } = req.body;
    console.log(tableID, rowID, title, rowData, columnType)
    let userID = req.user._id;
    let userName = req.user.firstName;

    const table = await Table.findById(tableID);

    const row = table.rowData.find((r) => r._id == rowID);
    if (!table && !row) {
      return res.status(404).json({ error: 'Table or Row not found' });
    }


    if (rowData && columnType) {
      const activityData = {
        userID:userID,
        userName :userName,
        workspaceID: table.workspaceID,
        tableID: tableID,
        column: columnType,
        task: row["task"],
        activity: "Row data updated",
      };
      if (["Due", "Date"].includes(columnType)) {
        activityData.previous = row[columnType.toLowerCase()];
        activityData.current = rowData[0];
        await TrackActivity.create(activityData);
        row[columnType.toLowerCase()] = rowData;
      } else if (columnType === "People") {
        const previousPeople = row.people || [];
        const currentPeople = rowData || [];
        const newPerson = currentPeople.find(person => !previousPeople.find(prevPerson => prevPerson.userID === person.userID))?.value;
        const missingPerson = previousPeople.find(person => !currentPeople.find(currPerson => currPerson.userID === person.userID))?.value;
        activityData.added = newPerson;
        activityData.deleted = missingPerson;
        await TrackActivity.create(activityData);
        row.people = currentPeople;
      } else  if (["Manager", "Status"].includes(columnType))  {
        activityData.previous = row[columnType.toLowerCase()]?.value;
        activityData.current = rowData?.value;
        await TrackActivity.create(activityData);
        row[columnType.toLowerCase()] = rowData;
      } else if (["Task", "Text"].includes(columnType)) {
        activityData.previous = row[columnType.toLowerCase()];
        activityData.current = rowData;
        await TrackActivity.create(activityData);
        row[columnType.toLowerCase()] = rowData;
      }
    }
    
    // Update the row title
    if (title) {
      let newActivity = new TrackActivity({
        userID: userID,
        userName: userName,
        workspaceID: table.workspaceID,
        tableID: tableID,
        tableTitle:title,
        activity: "Table title updated",
        previous: table.title,
        current: title,
      });
      await newActivity.save();
      table.title = title;
    }

    await table.save();
    // Send the updated row data to the client
    res.json({ success: true, row });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



//** Add a new new in the table
exports.addRowProjectManagement = async (req, res) => {
  try {
    const { tableID } = req.body;
    let userName = req.user.firstName;
    let userID = req.user._id;

    if (!tableID || !userID) {
      return res.status(400).json({
        success: false,
        message: "Faield to add new row",
      });
    }

    Table.findOne({ _id: tableID }, async (err, result) => {
      if (err) {
        res.status(500).json({ success: false, error: "Failed to add new row" });
      } else {
        let newRow = {
          task: "",
          manager: { userID: "", value: "" },
          date: new Date(),
        };

        if (result.rowData && result.rowData.length >= 1) {
          const existingRow = result.rowData[0];
          delete existingRow._id;
          Object.keys(existingRow).forEach((key) => {
            if (key === "task") {
              newRow[key] = "";
            }
            if (key === "manager") {
              newRow[key] = [{ userID: "", value: "" }];
            }
            if (key === "date") {
              newRow[key] = new Date();
            }
            if (key === "text") {
              newRow[key] = "";
            }
            if (key === "people") {
              newRow[key] = [{ userID: "", value: "" }];
            }
            if (key === "due") {
              newRow[key] = new Date();
            }
            if (key === "status") {
              newRow[key] = [{ userID: "", value: "" }];
            }
          });
        }

        const table = await Table.findOne({ _id: tableID }).select("rowData");

        const newAddedRow = { ...newRow, _id: new ObjectId() };
        table.rowData.push(newAddedRow);
        table.save();
        let newActivity = new TrackActivity({
          userID: userID,
          userName: userName,
          tableTitle: result.title,
          workspaceID: result.workspaceID,
          tableID: tableID,
          activity: "Added new row",
        });
        await newActivity.save();


        res.status(200).json({
          success: true,
          msg: "New row added successfully",
          data: newAddedRow
        });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add new row" });
  }
};

// //** Add a new Column in the table
exports.addColumnProjectManagement = async (req, res) => {
  try {
    const { tableID, columnType } = req.body;
    let userName = req.user.firstName;
    let userID = req.user._id;
    if (!tableID && !columnType && !userID) {
      return res.status(400).json({
        success: false,
        message: "tableID and Column type are required in the request body",
      });
    }
    const table = await Table.findById(tableID);
    if (!table) {
      return res.status(404).json({ success: false, massage: "Table not found" });
    }
    let { rowData } = table;

    let keys = Object.keys(rowData[0]);
    if (keys.includes(columnType)) {
      return res.status(404).json({ success: false, massage: "column already exist" });
    }
    rowData.forEach((row) => {
      switch (columnType) {
        case "text":
          row[columnType] = "";
          break;
        case "due":
          row[columnType] = new Date();
          break;
        case "status":
          row[columnType] = "";
          break;
        case "people":
          row[columnType] = [{ userID: "", value: "" }];
          break;
        default:
          break;
      }
    });
    table.rowData = rowData;
    let updatedTable = await table.save();

    let newActivity = new TrackActivity({
      userID: userID,
      userName: userName,
      workspaceID: table.workspaceID,
      tableID: tableID,
      tableTitle:table.title,
      activity: "Added new column",
      current: columnType,
    });
    await newActivity.save();

    res.status(200).json({
      success: true,
      data: updatedTable,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add new column" });
  }
};

// //** Delete Table
exports.deleteTableProjectManagement = async (req, res) => {
  try {
    const { tableID, workspaceID } = req.body;
    let userName = req.user.firstName;
    let userID = req.user._id;
    if (!tableID) {
      return res.status(400).json({
        success: false,
        message: "tableID are required in the request body",
      });
    }

    const deletedTable = await Table.findByIdAndDelete(tableID);
    if (!deletedTable) {
      return res.status(404).json({
        success: false,
        message: "The requested project management data could not be found.",
      });
    }

    let newActivity = new TrackActivity({
      userID: userID,
      userName: userName,
      tableTitle: deletedTable.title,
      workspaceID: workspaceID,
      tableID: tableID,
      activity: "Delete Table",
    });

    await newActivity.save();

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the project management data",
      error: err,
    });
  }
};

// //** Delete Row('s)
exports.deleteRowProjectManagement = async (req, res) => {
  try {
    const { workspaceID, tableID, rowIDs } = req.body;
    let userID = req.user._id;
    let userName = req.user.firstName;
    if (!tableID || !rowIDs || rowIDs.length < 1 || !userID) {
      return res.status(400).json({
        success: false,
        message: "userID TableID and rowID are required in the request body",
      });
    }
    let table = Table.find(tableID);
    Table.updateMany(
      { tableID },
      { $pull: { rowData: { _id: { $in: rowIDs } } } },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the rowData objects",
            error: error,
          });
        }
        if (result.modifiedCount > 0) {
          let newActivity = new TrackActivity({
            userID: userID,
            userName: userName,
            workspaceID: workspaceID,
            tableID: tableID,
            tableTitle: table.title,
            activity: "Row deleted",
          });
          await newActivity.save();

          res.status(200).json({
            success: true,
            message: "The rowData objects were successfully deleted",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "No matching rowData objects were found",
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting Row",
      error: err,
    });
  }
};

// //** Delete Column

exports.deleteColumnProjectManagement = (req, res) => {
  try {
    const { columnType, tableID } = req.body;
    let userName = req.user.firstName;
    let userID = req.user._id;

    const update = { [`$unset`]: { [`rowData.$[].${columnType}`]: 1 } };

    Table.updateOne({ _id: tableID }, update, (error, result) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: "Error deleting column",
          error,
        });
      } else {
        Table.findById(tableID, async (error, updatedTable) => {
          if (error) {
            return res.status(400).json({
              success: false,
              message: "Error fetching updated table",
              error,
            });
          } else {
            let newActivity = new TrackActivity({
              userID: userID,
              userName: userName,
              workspaceID: updatedTable.workspaceID,
              tableID: tableID,
              tableTitle: updatedTable.title,
              activity: "Column deleted",
            });
            await newActivity.save();

            return res.json({
              success: true,
              message: "Column deleted successfully",
              data: updatedTable,
            });
          }
        });
      }
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occurred while deleting column",
      error: error,
    });
  }
};


exports.ActivityAndLastSeen = (async (req, res) => {
  try {
    const id = req.query.id;
    let latestActivitiese = await TrackActivity.find({ workspaceID: id })
    let workspace = await Workspace.findOne({ _id: id });

    let workspaceMembers = [workspace.userID, ...workspace.accessIDs];
    let lastSeen = await LastSeen.find({ userID: { $in: workspaceMembers } });
    if (latestActivitiese || lastSeen) {
      return res.json({
        success: true,
        latestActivitiese,
        lastSeen
      })

    } else {
      return res.json({
        success: false,
        message: "An error occurred while fetching data",
      });
    }

  } catch (error) {
    return res.json({
      success: false,
      message: "An error occurred while fetching data",
      error: error,
    });
  }

})
