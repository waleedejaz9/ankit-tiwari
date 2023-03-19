/*    eslint-disable */

// ** React Imports
import React, { useState, useEffect } from 'react';

//** Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { projectActivities, tableDelete, rowsDelete, updatedTableColumn, updateRow } from '../store/reducer';

// ** Icons Imports
import { Plus, Delete, Trash, Trash2, MoreVertical } from 'react-feather';
import { FaChevronDown } from 'react-icons/fa';

// ** Third Party Components
import Select, { components } from 'react-select'; //eslint-disable-line
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Flatpickr from 'react-flatpickr'
import Confetti from 'react-confetti';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import { Row, Collapse, Table, Input, UncontrolledTooltip, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

// ** Styles
import '@styles/base/pages/page-projects.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Comp Imports
import ProjectModal from '../modal/Modal';

// ** Assignee Avatars
import img1 from '@src/assets/images/portrait/small/avatar-s-3.jpg';
import img2 from '@src/assets/images/portrait/small/avatar-s-1.jpg';
import img3 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import img4 from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import img5 from '@src/assets/images/portrait/small/avatar-s-2.jpg';

//** API
import {
  addColumn,
  deleteTable,
  deleteRow,
  updateTable,
  deleteColumn,

} from '../../../../requests/projects/project';

function GroupTable({ index, projectData, isOpen, onToggle, rotateIcon, onAddRow }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.userData);

  const [columnType, setColumnType] = useState('');
  const [rows, setRows] = useState([]);
  const [columeTitle, setColumnTitle] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const [groupTitle, setGroupTitle] = useState(projectData.title);
  const [rowIds, setRowIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteGroupModal, setDeleteGroupModal] = useState(false);
  const [deleteColumnModal, setDeleteColumnModal] = useState(false);
  const [columnTypeModal, setColumnTypeModal] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  console.log("rowssssss", rows);

  const initialValue = {
    done: [],
    working: [],
    pending: [],
    stuck: []
  };

  const valuesByType = rows?.reduce((result, { status } = {}) => {
    if (status != null && status.value != null) {
      const statusValue = status.value;
      if (!result[statusValue]) {
        result[statusValue] = [];
      }
      result[statusValue].push({ status });
    }
    return result;
  }, initialValue);

  let doneStatus = valuesByType?.done.length;
  let workingStatus = valuesByType?.working.length;
  let pendingStatus = valuesByType?.pending.length;
  let stuckStatus = valuesByType?.stuck.length;
  let totalProjects = rows?.length;
  let projectRemaining = totalProjects - doneStatus - workingStatus - pendingStatus - stuckStatus;

  let projectStatusDonePercentage = parseFloat((doneStatus / totalProjects) * 100).toFixed(2);
  let projectStatusWorkingPercentage = parseFloat((workingStatus / totalProjects) * 100).toFixed(2);
  let projectStatusPendingPercentage = parseFloat((pendingStatus / totalProjects) * 100).toFixed(2);
  let projectStatusStuckPercentage = parseFloat((stuckStatus / totalProjects) * 100).toFixed(2);
  let projectRemainingPercentage = parseFloat((projectRemaining / totalProjects) * 100).toFixed(2);

  // TODO: Get manager list according to their role

  // ** Assignee Select Options
  const assigneeOptions = [
    { value: 'Pheobe Buffay', label: 'Pheobe Buffay', img: img1 },
    { value: 'Chandler Bing', label: 'Chandler Bing', img: img2 },
    { value: 'Ross Geller', label: 'Ross Geller', img: img3 },
    { value: 'Monica Geller', label: 'Monica Geller', img: img4 }
  ];

  const employeeOptions = [
    { userID: '01', value: 'Astro Kramer', label: 'Astro', img: img2 },
    { userID: '02', value: 'George Costanza', label: 'George', img: img5 },
    { userID: '03', value: 'Charlie Kelly', label: 'Charlie', img: img4 },
    { userID: '04', value: 'Dennis Reynolds', label: 'Dennis', img: img3 }
  ];

  const options = [
    { value: 'pending', label: 'Pending', color: '#ff9f43' },
    { value: 'working', label: 'Working', color: '#7367f0' },
    { value: 'stuck', label: 'Stuck', color: '#ea5455' },
    { value: 'done', label: 'Done', color: '#28c76f' },
  ];

  const ReactSelect = styled(Select)`
    .Select-control {
      height: 26px;
      font-size: small;

      .Select-placeholder {
        line-height: 26px;
        font-size: small;
      }

      .Select-value {
        line-height: 26px;
      }

      .Select-input {
        height: 26px;
        font-size: small;
      }
    }
  `;

  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <img
            className="d-block rounded-circle me-50"
            src={data.img}
            height="26"
            width="26"
            alt={data.label}
          />
          <p className="mb-0">{data.value}</p>
        </div>
      </components.Option>
    );
  };

  // const SelectComponent = ({ data, ...props }) => {
  //   return (
  //     <components.Option {...props}>
  //       <div className="d-flex align-items-center">
  //         <p className="mb-0">{data.label}</p>
  //       </div>
  //     </components.Option>
  //   );
  // };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.value === 'done' ? '#28c76f !important;' : state.data.value === 'pending' ? '#ff9f43  !important;' : state.data.value === 'working' ? '#7367f0  !important;' : state.data.value === 'stuck' ? '#ea5455  !important;' : provided.backgroundColor,
      color: state.data.value === 'done' ? '#fff !important;' : '#fff !important;',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.selectProps.value && state.selectProps.value.value === 'done' ? '#fff !important;' : '#fff !important;',
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.selectProps.value && state.selectProps.value.value === 'done' ? '#28c76f !important;' : state.selectProps.value && state.selectProps.value.value === 'pending' ? '#ff9f43  !important;' : state.selectProps.value && state.selectProps.value.value === 'working' ? '#7367f0  !important;' : state.selectProps.value && state.selectProps.value.value === 'stuck' ? '#ea5455  !important;' : provided.backgroundColor,
    }),
  };

  // const handleChangeStatus = (option) => {
  //   setSelectedOption(option);
  //   if (option.value === 'done') {
  //     setShowConfetti(true);
  //   }
  // };

  const getOptionLabel = (option) => option.label;
  const getOptionValue = (option) => option.value;


  useEffect(() => {
    const desiredOrder = [
      '_id',
      'task',
      'manager',
      'people',
      'due',
      'status',
      'text',
      'date'
    ];
    let updatedRows = projectData.rowData;

    updatedRows = JSON.parse(JSON.stringify(updatedRows));
    if (updatedRows && updatedRows.length > 0) {
      const keys = Object.keys(updatedRows[0]);
      const result = desiredOrder
        .filter((key) => keys.includes(key))
        .map((key) => {
          const modifiedKey = key.charAt(0).toUpperCase() + key.slice(1);
          return modifiedKey;
        });
      setColumnTitle(result);
    } else {
      setColumnTitle([]);
    }
    setRows(updatedRows);
  }, [projectData]);

  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      setRowIds((prev) => [...prev, e.target.value]);
    } else {
      removeRowIds(e);
    }
    setShowActions(true);
  };

  const removeRowIds = (e) => {
    setRowIds([...rowIds.filter((ids) => ids !== e.target.value)]);
  };

  const toggleDelete = () => setDeleteModal(!deleteModal);
  const toggleDeleteGroup = () => setDeleteGroupModal(!deleteGroupModal);
  const toggleColumnType = () => setColumnTypeModal(!columnTypeModal);
  const toggleDeleteColumn = () => setDeleteColumnModal(!deleteColumnModal);

  const deleteRowHandler = (e) => {
    e.preventDefault();
    if (rowIds.length < 1) {
      toast.warning('Please select a project!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      let payload = {
        data: {
          tableID: projectData._id,
          rowIDs: rowIds,
          workspaceID: projectData.workspaceID
        }
      };
      deleteRow(payload).then((response) => {

        dispatch(rowsDelete({ workspaceID: projectData.workspaceID, tableID: projectData._id, rowIDs: rowIds }));
        dispatch(projectActivities(response?.data?.latestActivitiese))

        toggleDelete();
        setShowActions(false);
      });
      setRowIds([]);
    }
  };

  const addColumnHandler = () => {
    if (columnType === '') {
      toast.warning('Please select a column type!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      const payload = {
        tableID: projectData._id,
        columnType: columnType,
        userID: currentUser.id
      };
      addColumn(payload).then((response) => {

        dispatch(updatedTableColumn({ workspaceID: projectData.workspaceID, tableID: projectData._id, updatedTable: response.data.data }));
        dispatch(projectActivities(response?.data?.latestActivitiese))

        toggleColumnType();
      });
    }
  };
  const deleteColumnHanlder = () => {
    let payload = {
      data: {
        tableID: projectData._id,
        columnType: columnType,
        userID: currentUser.id
      }
    };
    deleteColumn(payload).then((response) => {
      dispatch(updatedTableColumn({ workspaceID: projectData.workspaceID, tableID: projectData._id, updatedTable: response.data.data }));
      dispatch(projectActivities(response?.data?.latestActivitiese))

      toggleDeleteColumn();
      setShowActions(true);
    })
  }
  const deleteGroupHandler = () => {
    let payload = {
      data: {
        tableID: projectData._id,
        workspaceID: projectData.workspaceID
      }
    };
    deleteTable(payload).then((response) => {
      if (response) {
        dispatch(tableDelete({ workspaceID: projectData.workspaceID, tableID: projectData._id, }))
        dispatch(projectActivities(response?.data?.latestActivitiese))

      } else {
        toast.error('Failed to deleted project!');
      }
      toggleDeleteGroup();
      setShowActions(true);
    });
  };

  const handleChange = (e, i, j) => {
    const newRows = [...rows];
    newRows[i] = { ...newRows[i], [columeTitle[j].toLowerCase()]: e.target.value };
    setRows(newRows);
  };

  let onSelectHandler = (data, rowID, column) => {
    let newData;

    if (column === "People" || column === "Due" || column === "Date") {
      newData = [...data];
    } else if (column === "Manager" || column === "Status") {
      newData = {
        userID: currentUser._id,
        value: data.value
      };
    }
    let payload = {
      tableID: projectData._id,
      rowID: rowID,
      rowData: newData,
      columnType: column,
    };

    console.log(payload, "datadata")
    updateTable(payload).then((response) => {
      dispatch(updateRow({
        workspaceID: projectData.workspaceID,
        tableID: projectData._id,
        rowID: rowID,
        columnType: column,
        updatedRow: response?.data?.row
      }))
    })
  }


  let trackEnterKey = (event, rowID, column) => {
    if (event.key === 'Enter') {
      let rowData = event.target.value;
      let payload = {
        tableID: projectData._id,
        rowID: rowID,
        rowData: rowData,
        columnType: column
      };
      updateTable(payload).then((response) => {
        dispatch(updateRow({
          workspaceID: projectData.workspaceID,
          tableID: projectData._id,
          rowID: rowID,
          columnType: column,
          updatedRow: response?.data?.row
        }))
      });
      event.target.blur();
    }
  };
  let trackEnterKeyForTitle = (event) => {
    if (event.key === 'Enter') {
      let payload = {
        tableID: projectData._id,
        title: groupTitle,
      };
      updateTable(payload).then((response) => {
      });
      event.target.blur();
    };
  }
  return (
    <div>
      <Row style={{ marginBottom: '1rem' }}>
        <div className="board-wrapper">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div className="d-flex align-items-center gap-1 board-header">
              <div className="project-group" onClick={() => onToggle(index)}>
                <FaChevronDown
                  size={15}
                  className={`${rotateIcon ? 'project-group-rotate-icon' : 'project-group-rotate-start'
                    }`}
                  style={{ color: '#7367f0', cursor: 'pointer' }}
                />
              </div>
              <Input
                className="group-title"
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
                onKeyPress={trackEnterKeyForTitle}
                style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  border: '0',
                  backgroundColor: 'transparent'
                }}
              />
            </div>

            <div className="d-flex align-items-center justify-content-center gap-2" style={{ paddingRight: "1.5rem" }}>
              {rotateIcon && (<div
                className="cursor-pointer"
                onClick={() => {
                  onAddRow(projectData._id);
                }}
                style={{ color: '#28c76f' }}
              >
                <Plus size={20} id={'AddProject-Tooltip' + projectData._id} />
                <UncontrolledTooltip placement="top" target={'AddProject-Tooltip' + projectData._id}>
                  New Task
                </UncontrolledTooltip>
              </div>
              )}

              {rotateIcon && rowIds.length > 0 ? (<div className="cursor-pointer" onClick={toggleDelete}>
                <Delete size={20} id={'DeleteProject-Tooltip' + projectData._id} />
                <UncontrolledTooltip placement="top" target={'DeleteProject-Tooltip' + projectData._id}>
                  Delete Task
                </UncontrolledTooltip>
              </div>
              )
                :
                ''
              }

              {rotateIcon && (
                <div
                  className="cursor-pointer"
                  onClick={toggleDeleteGroup}
                  style={{ color: '#ea5455' }}
                >
                  <Trash2 size={20} id={'DeleteGroup-Tooltip' + projectData._id} />
                  <UncontrolledTooltip
                    key={projectData._id}
                    placement="top"
                    target={'DeleteGroup-Tooltip' + projectData._id}
                  >
                    Delete Project
                  </UncontrolledTooltip>
                </div>
              )}
            </div>

            <ProjectModal
              title="Do you really want to delete selected task(s)?"
              toggle={toggleDelete}
              modal={deleteModal}
              saveButtonText="Delete"
              saveButtonColor="danger"
              onClick={deleteRowHandler}
            />

            <ProjectModal
              title="Do you really want to delete this project?"
              toggle={toggleDeleteGroup}
              modal={deleteGroupModal}
              saveButtonText="Delete"
              saveButtonColor="danger"
              onClick={deleteGroupHandler}
            />

            <ProjectModal
              title="Do you really want to delete this column?"
              toggle={toggleDeleteColumn}
              modal={deleteColumnModal}
              saveButtonText="Delete"
              saveButtonColor="danger"
              onClick={deleteColumnHanlder}
            />

            <ProjectModal
              title="Add Column Type"
              toggle={toggleColumnType}
              modal={columnTypeModal}
              saveButtonText="Add"
              saveButtonColor="primary"
              onClick={addColumnHandler}
              addInputBody={true}
              onChange={(e) => setColumnType(e.target.value)}
            />
          </div>
        </div>
      </Row>
      <Collapse className="project-table-collapse" isOpen={isOpen}>
        <Table bordered responsive>
          <thead>
            <tr>
              {columeTitle.map((column) =>
                column === '_id' ? (
                  <th style={{ maxWidth: 'fit-content', paddingTop: '1.3rem' }}>Select</th>
                ) : (
                  <th id={column}>
                    <div className='project-column-title' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Input
                        className="group-title"
                        value={column}
                        style={{
                          border: '0',
                          backgroundColor: 'transparent',
                          verticalAlign: 'top',
                          textTransform: 'uppercase',
                          fontSize: '0.857rem',
                          fontWeight: 'bold',
                          letterSpacing: '0.5px'
                        }}
                      />
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="hide-arrow me-1"
                          tag="a"
                          href="/"
                          onClick={(e) => {
                            e.preventDefault()
                            setColumnType(column.toLowerCase())
                          }
                          }
                        >
                          <MoreVertical className="text-body" size={16} />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <DropdownItem>
                            <div
                              className="cursor-pointer d-flex gap-1"
                              onClick={toggleDeleteColumn}
                              style={{ color: '#ea5455' }}
                            >
                              <Trash size={18} id={'DeleteGroup-Col'} />
                              Delete
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </th>
                )
              )}{' '}
              {rows?.length > 0 && (
                <th class="ml-4" style={{ position: 'sticky', right: 0, paddingTop: '1.3rem' }}>
                  <div
                    className="cursor-pointer"
                    color="primary"
                    onClick={toggleColumnType}
                    click
                    size={14}
                  >
                    <Plus size={20} id={'AddProject-Col' + projectData._id} />{' '}
                    <UncontrolledTooltip placement="top" target={'AddProject-Col' + projectData._id}>
                      Add Column
                    </UncontrolledTooltip>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, i) => (
              <tr className="project-table-row" key={row._id}>
                {columeTitle.map((column, j) => (
                  <td className="project-table-fields" key={j} style={{ position: 'relative', textAlign: 'center' }}>
                    {column === '_id' ? (
                      <div>
                        <Input
                          className="project-table-checkbox"
                          type="checkbox"
                          value={row._id}
                          onChange={(e) => handleChangeCheckbox(e)}
                        />
                      </div>
                    ) : column === 'Task' ? (
                      <Input
                        type="text"
                        value={row[column.toLowerCase()]}
                        onChange={(e) => handleChange(e, i, j)}
                        onKeyPress={(event) => trackEnterKey(event, row._id, column)}
                        required
                        style={{ minWidth: '10rem' }}
                      />
                    ) : column === 'Text' ? (
                      <Input
                        type="text"
                        value={row[column.toLowerCase()]}
                        onChange={(e) => handleChange(e, i, j)}
                        onKeyPress={(event) => trackEnterKey(event, row._id, column)}
                        required
                        style={{ minWidth: '12rem' }}
                      />
                    ) : column === 'Date' ? (
                      <Flatpickr
                        type="date"
                        options={{
                          dateFormat: 'm-d-Y',
                        }}
                        value={(row[column.toLowerCase()])}
                        onChange={(data) => { onSelectHandler(data, row._id, column) }}
                        required
                        style={{ minWidth: '8rem', backgroundColor: '#fff' }}
                        className="form-control date-picker"
                      />
                    ) : column === 'Due' ? (
                      <Flatpickr
                        type="date"
                        options={{
                          dateFormat: 'm-d-Y',
                        }}
                        value={(row[column.toLowerCase()])}
                        onChange={(data) => { onSelectHandler(data, row._id, column) }}
                        required
                        style={{ minWidth: '8rem', backgroundColor: '#fff' }}
                        className="form-control date-picker"
                      />
                    ) : column === 'Manager' ? (
                      <div style={{ minWidth: '12rem' }}>
                        <ReactSelect
                          value={row[column.toLowerCase()] ? assigneeOptions.find(x => x.value === row[column.toLowerCase()].value) : ''}
                          isClearable={false}
                          className="react-select"
                          classNamePrefix="select"
                          options={assigneeOptions}
                          theme={selectThemeColors}
                          onChange={(data) => { onSelectHandler(data, row._id, column) }}
                          components={{ Option: AssigneeComponent }}
                          menuPortalTarget={document.body}
                        />
                      </div>
                    ) : column === 'People' ? (
                      <div style={{ minWidth: '12rem' }}>
                        <ReactSelect
                          isMulti
                          value={row.hasOwnProperty(column.toLowerCase())
                            ? employeeOptions.filter(option => row[column.toLowerCase()].some(rowOption => rowOption.value === option.value)) : []}
                          isClearable={false}
                          className="react-select"
                          classNamePrefix="select"
                          options={employeeOptions}
                          theme={selectThemeColors}
                          onChange={(people) => {
                            const newRows = [...rows];
                            newRows[i][columeTitle[j].toLowerCase()] = people;
                            // setRows(newRows);
                            let data = newRows[i][columeTitle[j].toLowerCase()]
                            onSelectHandler(data, row._id, column)
                          }}

                          components={{ Option: AssigneeComponent }}
                          menuPortalTarget={document.body}
                        />
                      </div>
                    ) : column === 'Status' ? (
                      <div className='project-status-container' key={row._id} style={{ minWidth: '8rem', position: 'relative', cursor: 'pointer', color: '#fff' }}>
                        <ReactSelect
                          options={options}
                          value={row[column.toLowerCase()] ? options.find(x => x.value === row[column.toLowerCase()].value) : ''}
                          onChange={(data) => {
                            onSelectHandler(data, row._id, column)
                            if (data.value === 'done') {
                              setShowConfetti(true);
                            }
                          }}
                          getOptionLabel={getOptionLabel}
                          getOptionValue={getOptionValue}
                          isClearable={false}
                          className="react-select"
                          classNamePrefix="select"
                          isSearchable={true}
                          styles={customStyles}
                          menuPortalTarget={document.body}
                        />
                        {showConfetti && row[column.toLowerCase()]?.value === 'done' ? (
                          <Confetti
                            width={200}
                            height={50}
                            recycle={false}
                            numberOfPieces={200}
                            gravity={0.2}
                            initialVelocityX={{ min: -10, max: 10 }}
                            initialVelocityY={{ min: -10, max: 10 }}
                            onConfettiComplete={() => setShowConfetti(false)}
                            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                          />
                        )
                          :
                          null
                        }
                      </div>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        {rows?.length > 0 && rows[0]?.status ?
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', marginTop: '10px', fontWeight: 400, cursor: 'pointer' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: '1px solid #ebe9f1', width: '20rem', height: '2.5rem', marginLeft: 'auto', marginRight: 'auto' }}>
              <div style={{ position: 'absolute', height: '27px', width: '98%', marginLeft: '3px', marginRight: '3px', zIndex: 0, backgroundColor: '#c4c4c4' }} id="projectStatusInitial"></div>
              <div class="project-status-wrapper" style={{ position: 'absolute', display: 'flex', alignItems: 'center', zIndex: 1, width: '100%', height: '100%', padding: '3px' }}>
                <div style={{ width: `${projectStatusDonePercentage}%`, height: '100%', backgroundColor: '#28c76f' }} id="projectStatusDone">
                  <UncontrolledTooltip placement="top" target={'projectStatusDone'}>
                    Done {doneStatus} / {totalProjects} &nbsp; {projectStatusDonePercentage}%
                  </UncontrolledTooltip>
                </div>
                <div style={{ width: `${projectStatusWorkingPercentage}%`, height: '100%', backgroundColor: '#7367f0' }} id="projectStatusWorking">
                  <UncontrolledTooltip placement="top" target={'projectStatusWorking'}>
                    Working {workingStatus} / {totalProjects} &nbsp; {projectStatusWorkingPercentage}%
                  </UncontrolledTooltip>
                </div>
                <div style={{ width: `${projectStatusStuckPercentage}%`, height: '100%', backgroundColor: '#ea5455' }} id="projectStatusStuck">
                  <UncontrolledTooltip placement="top" target={'projectStatusStuck'}>
                    Stuck {stuckStatus} / {totalProjects} &nbsp; {projectStatusStuckPercentage}%
                  </UncontrolledTooltip>
                </div>
                <div style={{ width: `${projectStatusPendingPercentage}%`, height: '100%', backgroundColor: '#ff9f43' }} id="projectStatusPending">
                  <UncontrolledTooltip placement="top" target={'projectStatusPending'}>
                    Pending {pendingStatus} / {totalProjects} &nbsp; {projectStatusPendingPercentage}%
                  </UncontrolledTooltip>
                </div>
                <div style={{ width: `${projectRemainingPercentage}%`, height: '100%', backgroundColor: '#c4c4c4' }} id="projectRemainingPercentage">
                  <UncontrolledTooltip placement="top" target={'projectRemainingPercentage'}>
                    {projectRemaining} / {totalProjects} &nbsp; {projectRemainingPercentage}%
                  </UncontrolledTooltip>
                </div>
              </div>
            </div>
          </div>
          :
          null
        }
      </Collapse>
    </div >
  );
}

export default GroupTable;
