// ** React Imports
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// ** Custom Components
import DataTable from 'react-data-table-component';

// ** Third Party Components
import { ReactSortable } from 'react-sortablejs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Menu,
  Search,
  MoreVertical,
  ChevronDown,
  Edit,
  Trash2,
  Star,
  Copy,
  Trash,
  Info,
  Share2,
  Plus,
  Filter,
  Users,
  Columns,
  Calendar,
  List,
  CheckCircle,
  Image,
  Edit2
} from 'react-feather';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import withReactContent from 'sweetalert2-react-content';

// ** Reactstrap Imports
import {
  Input,
  Button,
  Badge,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';

// ** Import Components
import NewModal from './NewModal';
import HabitDetails from './../habit-view/HabitDetails';
import CreateNewModal from '../createNew/CreateNewModal';
import useColumns from './useColumns';

import AddHabitModal from '../habit-view/AddHabitModal';

// ** Styles
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

// ** HANDLING DATA
import { useDispatch } from 'react-redux';
import { setGoalsReducer } from '../store/reducer';
import EditHabitModal from '../habit-view/EditHabitModal';

import img from './../../../assets/images/banner/banner-20.jpg';
import AddGoalModal from '../goal-view/AddGoalModal';

const badgeColor = ['danger', 'primary', 'success', 'warning', 'info', 'secondary'];

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
};

const convertDate = (date) => {
  const d = new Date(date);
  return (
    <span>
      {d.getUTCMonth() + 1}/{d.getDate()}/{d.getUTCFullYear()}
    </span>
  );
};
// ** EXPANDED COMPONENT
// const ExpandedComponent = ({ data, store }) => {
//   const dispatch = useDispatch();

// const handleStatusClicked = (row) => {
//   let temp = row;
//   if (row.progress < row.total) {
//     temp = { ...row, progress: row.progress + 1 };
//     if (temp.progress === temp.total) {
//       temp = { ...temp, status: 'done' };
//     }
//   }
//   let goalTemp = store.goals.find((x) => {
//     for (const i of x.subGoals) {
//       if (i._id === row._id) {
//         return x;
//       }
//     }
//   });

//   let tempSubGoals = goalTemp.subGoals?.map((x) => {
//     if (x._id === temp._id) {
//       return temp;
//     }
//     return x;
//   });

//   goalTemp = {
//     ...goalTemp,
//     subGoals: tempSubGoals,
//     progress: tempSubGoals.filter((x) => x.status === 'done').length
//   };
//   const tempStore = store.goals.map((x) => {
//     if (x._id === goalTemp._id) {
//       return goalTemp;
//     }
//     return x;
//   });
//   dispatch(setGoalsReducer(tempStore));
// };
//   const columns = [
//     {
//       name: 'HABIT',
//       selector: (row) => row.name
//     },
//     {
//       name: 'TARGET',
//       selector: (row) => row.target
//     },

//     {
//       name: 'START',
//       selector: (row) => <span>{convertDate(row.startDate)}</span>
//     },
//     {
//       name: 'END',
//       selector: (row) => <span>{convertDate(row.endDate)}</span>
//     },
//     {
//       name: 'STREAK',
//       selector: (row) => row.progress,
//       cell: (row) => (
//         <Progress className="w-100" value={row.progress} max={row.total}>
//           {row.progress}/{row.total}
//         </Progress>
//       )
//     },
//     {
//       name: 'STATUS',
//       width: '120px',
//       sortable: true,
//       sortField: 'status',
//       selector: (row) => row.status,
//       cell: (row) => (
//         <Badge className="text-capitalize" color={statusObj[row.status]} pill>
//           {row.status}
//         </Badge>
//       )
//     },
//     {
//       name: 'RECORD',
//       width: '140px',
//       // center: true,
//       selector: (row) => row.isCompleted,
//       cell: (row) =>
//         row.status !== 'done' ? (
//           <Button color="primary" size="sm" onClick={() => handleStatusClicked(row)}>
//             <span className="text-small" style={{ fontSize: '11px' }}>
//               RECORD
//             </span>
//           </Button>
//         ) : (
//           <Button disabled="true" color="secondary" size="sm">
//             <span style={{ fontSize: '11px' }}>RECORD</span>
//           </Button>
//         )
//     }
//   ];
//   return (
//     <div className="container">
//       <DataTable
//         noHeader
//         sortServer
//         pagination
//         responsive
//         columns={columns}
//         className="react-dataTable"
//         data={data.subGoals}
//         paginationPerPage={5}
//         paginationRowsPerPageOptions={[2, 5, 10]}
//       />
//     </div>
//   );
// };
const ExpandedComponent = ({ data, store }) => {
  const [activeTab, setActiveTab] = useState('1');
  //const dispatch = useDispatch();
  const [showEditImage, setShowEditImage] = useState(false);

  return (
    <>
      <div className="container pb-1">
        <Row>
          <Col md="3" className="mt-auto mb-0">
            <div>
              <h6 className="text-center">Dream</h6>
              <div>
                <Badge
                  color="primary"
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    display: `${showEditImage ? 'block' : 'none'}`
                  }}
                  className="ms-50 mt-50"
                  onMouseEnter={() => setShowEditImage(true)}
                >
                  <Edit2 size={14} />
                </Badge>
                <img
                  src={img}
                  className="w-100 img-thumbnail img-fluid"
                  style={{ height: '100px' }}
                  onMouseEnter={() => setShowEditImage(true)}
                  onMouseLeave={() => setShowEditImage(false)}
                />
              </div>
            </div>
          </Col>
          <Col md="9">
            <div className="d-flex justify-content-between">
              <Nav tabs>
                <NavItem>
                  <NavLink active={activeTab === '1'} onClick={() => setActiveTab('1')}>
                    Vision
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={activeTab === '2'} onClick={() => setActiveTab('2')}>
                    Purposes
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={activeTab === '3'} onClick={() => setActiveTab('3')}>
                    Obstacles
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={activeTab === '4'} onClick={() => setActiveTab('4')}>
                    Resources
                  </NavLink>
                </NavItem>
              </Nav>
              <div>
                <Button color="outline-primary" className="mt-1">
                  Save
                </Button>
              </div>
            </div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Input
                  type="textarea"
                  defaultValue="Type your vision is on why you think you think fixing this habit will give you the feeling of accomplishment?"
                />
              </TabPane>
              <TabPane tabId="2">
                <Input
                  type="textarea"
                  defaultValue="Why do you need this accomplish this goal? Write it here. Ex. For my family"
                />
              </TabPane>
              <TabPane tabId="3">
                <Input
                  type="textarea"
                  defaultValue="Write any obstacles that you need to remind yourself. Ex. To accomplish this goal or break this habit I must __"
                />
              </TabPane>
              <TabPane tabId="4">
                <Input
                  type="textarea"
                  defaultValue="Add any resources here that may help you achieve your goal. Many add material here to remind themselves how to accomplish this goal or obtain a new positive habit"
                />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    </>
  );
};

const TaskList = (props) => {
  // ** Props
  const {
    store,
    collapse,
    labelColors,
    dispatch,
    getTasks,
    updateTask,
    selectedWorkspace,
    selectTask,
    // reOrderTasks,
    handleTaskSidebar,
    handleMainSidebar,
    handleWorkspaceCollapse
  } = props;

  // ** States
  const [newGoalModal, setNewGoalModal] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [taskSearchResult, setTaskSearchResult] = useState([]);
  const [deleteTaskArr, setDeleteTaskArr] = useState([]);
  const [modalType, setModalType] = useState(0);
  const [openHabitDetails, setOpenHabitDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [openAddSubHabit, setOpenAddSubHabit] = useState(false);
  const [openEditHabit, setOpenEditHabit] = useState(false);
  const [type, setType] = useState('sub'); //sub || origin

  const paramsURL = useParams();

  const MySwal = withReactContent(Swal);

  // ** TOGGLERS
  const toggleNewGoalModal = () => setNewGoalModal(!newGoalModal);
  const toggleHabitDetails = (task) => {
    setSelectedTask(task);
    setOpenHabitDetails(!openHabitDetails);
  };
  const handleOpenAddSubHabit = (row, type) => {
    setSelectedTask(row);
    setType(type);
    setOpenAddSubHabit(!openAddSubHabit);
  };
  //{handleOpenAddSubHabit},{handleOpenEdit},{handleOpenDelete}
  const handleOpenEdit = (row, type) => {
    setSelectedTask(row);
    setType(type);
    setOpenEditHabit(!openEditHabit);
  };
  const handleOpenDelete = async (row) => {
    const result = await MySwal.fire({
      title: 'Delete?',
      text: `Are you sure you want to delete the ${row.type} ?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (result.value) {
      //handle deleting data
      toast.success('Habit deleted successfully!');
    }
  };

  useEffect(() => {
    // setTaskSearchResult(store.goals);
  }, [store]);
  var params = {
    filter: paramsURL.filter || '',
    q: '',
    sortBy: '',
    tag: paramsURL.tag || ''
  };

  // ** Function to selectTask on click
  const handleTaskClick = (obj) => {
    //handleTaskSidebar();
  };

  // ** Search Tasks
  const taskSearch = (searchParams) => {
    let resultData = store.tasks;
    if (searchParams.q) {
      resultData = store.tasks.filter((x) => {
        let searchTxt = `${x.title}${x.description}${x.labels}`;
        x.assignedTo.forEach((element) => {
          searchTxt += element.title;
        });
        return searchTxt.toLowerCase().indexOf(searchParams.q) > -1;
      });
    }
    setTaskSearchResult(resultData);
  };

  const { columns } = useColumns(
    { toggleHabitDetails },
    { handleOpenAddSubHabit },
    { handleOpenEdit },
    { handleOpenDelete }
  );
  // ** Render Goals
  const renderListTasks = () => {
    return (
      <PerfectScrollbar
        className="list-group task-task-list-wrapper"
        options={{ wheelPropagation: false }}
        containerRef={(ref) => {
          if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect;

            ref.getBoundingClientRect = () => {
              const original = ref._getBoundingClientRect();

              return {
                ...original,
                height: Math.floor(original.height)
              };
            };
          }
        }}
      >
        {taskSearchResult.length ? (
          <ReactSortable
            tag="ul"
            list={taskSearchResult}
            handle=".drag-icon"
            className="task-task-list media-list"
            setList={(newState) => handleSetList(newState)}
            overFlow="auto"
          >
            <DataTable
              className="react-dataTable"
              responsive
              columns={columns}
              data={taskSearchResult}
              //onRowClicked={handleTaskClick}
              style={{ cursor: 'pointer' }}
              sortIcon={<ChevronDown size={14} />}
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              expandableRowsComponentProps={{ store: store }}
              pagination
            />
          </ReactSortable>
        ) : (
          <div className="no-results show">
            <h5>No Items Found</h5>
          </div>
        )}
      </PerfectScrollbar>
    );
  };

  // ** Function to taskSearch based on search query
  const handleFilter = (e) => {
    setQuery(e.target.value);
    params.q = e.target.value;
    params.sortBy = sort;
    taskSearch(params);
  };

  // ** Function to taskSearch based on sort
  const handleSort = (e, val) => {
    e.preventDefault();
    setSort(val);
    params.query = query;
    params.sortBy = val;
    taskSearch(params);
  };

  const handleSetList = (e) => {};
  return (
    <div className="task-app-list">
      <div className="app-fixed-search d-flex align-items-center">
        <div
          className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1"
          onClick={handleMainSidebar}
        >
          <Menu size={21} />
        </div>
        <div className="d-flex align-content-center justify-content-between w-100">
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
            <Input placeholder="Search Task" value={query} onChange={handleFilter} />
          </InputGroup>
        </div>
        <div className="d-flex">
          <Button.Ripple
            className="btn-icon me-1"
            outline
            color="primary"
            onClick={() => setModalType(1)}
            disabled={
              store.selectedWorkspace.title === 'Personal' ||
              store.selectedWorkspace.title === 'Business'
            }
          >
            <Columns size={16} />
          </Button.Ripple>
          <Button.Ripple
            className="btn-icon me-1"
            outline
            color="primary"
            onClick={toggleNewGoalModal}
            disabled={!store.boards.length}
          >
            <Plus size={16} />
          </Button.Ripple>
          {/* <Button.Ripple
            className="btn-icon me-1"
            outline
            color="primary"
            onClick={() => setModalType(3)}
            disabled={!delBtnEnable}
          >
            <Trash size={16} />
          </Button.Ripple> */}
          {/* <Button color="flat-dark" className="d-flex">
            <Filter size={14} />
            <span className="align-middle ms-25">Filters</span>
          </Button>
          <Button color="flat-dark" className="d-flex">
            <Users size={14} />
            <span className="align-middle ms-25">Assignee</span>
          </Button> */}
        </div>
        <NewModal
          store={store}
          dispatch={dispatch}
          modalType={modalType}
          deleteTaskArr={deleteTaskArr}
          setDeleteTaskArr={setDeleteTaskArr}
          setModalType={setModalType}
        />
        <CreateNewModal open={newGoalModal} toggle={toggleNewGoalModal} />
        {store && (
          <HabitDetails
            open={openHabitDetails}
            toggle={toggleHabitDetails}
            task={selectedTask}
            dispatch={dispatch}
            store={store}
          />
        )}
        {selectedTask && (
          <AddGoalModal
            toggle={handleOpenAddSubHabit}
            open={openAddSubHabit}
            task={selectedTask}
            type={type}
          />
        )}
        {selectedTask && (
          <EditHabitModal
            toggle={handleOpenEdit}
            open={openEditHabit}
            task={selectedTask}
            type={type}
          />
        )}
      </div>

      <PerfectScrollbar
        className="list-group task-list-wrapper bg-dark bg-opacity-10"
        options={{ wheelPropagation: false }}
      >
        {renderListTasks()}
      </PerfectScrollbar>
    </div>
  );
};

export default TaskList;
