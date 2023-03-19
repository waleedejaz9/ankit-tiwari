// ** React Imports
import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';

// ** Blank Avatar Image
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png';

// ** Third Party Components
import classnames from 'classnames';
import { ReactSortable } from 'react-sortablejs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { BiCalendarEvent } from 'react-icons/bi';
import { BsPrinter } from 'react-icons/bs';
import {
  Menu,
  Search,
  MoreVertical,
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
  ChevronDown,
  TrendingUp,
  Download,
  Share,
  FileText,
  Upload
} from 'react-feather';
import { AiOutlineDelete } from 'react-icons/ai';

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
  Card,
  Row,
  Col,
  Label
} from 'reactstrap';

// ** Import Components
import NewModal from './NewModal';

// ** Styles
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import useColumns from './useColumns';

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
  const [goalView, setGoalView] = useState('1');
  const [delBtnEnable, setDelBtnEnable] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [taskSearchResult, setTaskSearchResult] = useState([]);
  const [deleteTaskArr, setDeleteTaskArr] = useState([]);
  const [modalType, setModalType] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ** Columns
  const { columns } = useColumns();

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const paramsURL = useParams();

  useMemo(() => {
    setTaskSearchResult(store.tasks);
  }, [store]);

  var params = {
    filter: paramsURL.filter || '',
    q: '',
    sortBy: '',
    tag: paramsURL.tag || ''
  };

  // ** Function to selectTask on click
  const handleTaskClick = (obj) => {
    dispatch(selectTask(obj));
    handleTaskSidebar();
  };

  // ** Custom Table Header
  const CustomTableHeader = () => {
    return (
      <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
        <Row>
          <Col xl="2" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center w-100">
              <Input
                className="mx-50"
                type="select"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handlePerPage}
                style={{ width: '5rem' }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input>
              <label htmlFor="rows-per-page">Entries</label>
            </div>
          </Col>
          <Col
            xl="10"
            className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
              <Input
                id="search-invoice"
                className="ms-1 w-100"
                type="text"
                // value={tempValue}
                onChange={(e) => {
                  clearTimeout(typingTimer);
                  typingTimer = setTimeout(() => doneTyping(e.target.value), doneTypingInterval);
                }}
                placeholder="Search..."
              />
            </div>
            <div className="d-flex text-center">
              <div>
                <Button
                  className="btn-icon me-1"
                  outline
                  color="primary"
                  // onClick={() => toggle ((p) => !p)}
                >
                  <AiOutlineDelete size={16} />
                </Button>
              </div>
              <div>
                <Button className="btn-icon me-1" outline color="primary" onClick={() => {}}>
                  {/* <BiUser size={16} /> */}
                  <TrendingUp size={16} />
                </Button>
              </div>
              <div>
                <Button className="btn-icon me-1" outline color="primary" onClick={() => {}}>
                  <BsPrinter size={16} />
                </Button>
              </div>

              <div>
                <Button.Ripple className="btn-icon me-1" outline color="primary" onClick={() => {}}>
                  <Download size={16} />
                </Button.Ripple>
              </div>
            </div>
            <div className="d-flex align-items-center table-header-actions">
              <UncontrolledDropdown className="me-1">
                <DropdownToggle color="secondary" caret outline>
                  <Share className="font-small-4 me-50" />
                  <span className="align-middle">Export</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className="w-100"
                    onClick={() => {
                      // downloadCSV(store.data)
                    }}
                  >
                    <FileText className="font-small-4 me-50" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Button
                style={{ fontSize: '12px', whiteSpace: 'nowrap' }}
                className="add-new-user"
                color="primary"
              >
                Add New Lead
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      // <div className="d-flex align-items-center justify-content-between w-100">
      //   <div className="d-flex align-items-center w-100">
      //     <label htmlFor="rows-per-page">Show</label>
      //     <Input
      //       className="mx-50"
      //       type="select"
      //       id="rows-per-page"
      //       value={rowsPerPage}
      //       onChange={handlePerPage}
      //       style={{ width: '5rem' }}
      //     >
      //       <option value="10">10</option>
      //       <option value="25">25</option>
      //       <option value="50">50</option>
      //     </Input>
      //     <label htmlFor="rows-per-page">Entries</label>
      //   </div>
      //   <div
      //     className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1"
      //     onClick={handleMainSidebar}
      //   >
      //     <Menu size={21} />
      //   </div>
      //   <div className="d-flex align-content-center justify-content-between w-100 me-1">
      //     <InputGroup className="input-group-merge">
      //       <InputGroupText>
      //         <Search className="text-muted" size={14} />
      //       </InputGroupText>
      //       <Input placeholder="Search Task" value={query} onChange={handleFilter} />
      //     </InputGroup>
      //   </div>
      //   <div className="d-flex">
      //     <Button.Ripple
      //       className="btn-icon me-1"
      //       outline
      //       color="primary"
      //       onClick={() => setModalType(1)}
      //     >
      //       <Columns size={16} />
      //     </Button.Ripple>
      //     <Button.Ripple
      //       className="btn-icon me-1"
      //       outline
      //       color="primary"
      //       onClick={() => setModalType(2)}
      //       disabled={!store.boards.length}
      //     >
      //       <Plus size={16} />
      //     </Button.Ripple>
      //     <Button.Ripple
      //       className="btn-icon me-1"
      //       outline
      //       color="primary"
      //       onClick={() => setModalType(3)}
      //       disabled={!delBtnEnable}
      //     >
      //       <Trash size={16} />
      //     </Button.Ripple>
      //   </div>
      //   <NewModal
      //     store={store}
      //     dispatch={dispatch}
      //     modalType={modalType}
      //     deleteTaskArr={deleteTaskArr}
      //     setDeleteTaskArr={setDeleteTaskArr}
      //     setModalType={setModalType}
      //   />
      // </div>
    );
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(taskSearchResult.length / rowsPerPage);
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName="active-page"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    return taskSearchResult || [];
  };

  const renderAssignee = (row) => {
    let tmpValue = 0;
    Array.from(row?.title).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    return (
      <div className="own-avatar">
        {row.title ? (
          <UncontrolledTooltip placement={row.placement} target={row.title.split(' ').join('-')}>
            {row.title}
          </UncontrolledTooltip>
        ) : null}
        {row?.img ? (
          <Avatar
            className={classnames('pull-up', {
              [row.className]: row.className
            })}
            img={row.img}
            width="32"
            height="32"
            {...(row.title ? { id: row.title.split(' ').join('-') } : {})}
          />
        ) : (
          <Avatar
            color={color || 'primary'}
            className={classnames('pull-up', {
              [row.className]: row.className
            })}
            content={row.title || 'John Doe'}
            {...(row.title ? { id: row.title.split(' ').join('-') } : {})}
            width="32"
            height="32"
            initials
          />
        )}
      </div>
    );
  };

  const renderAssignees = (data) => {
    return <div className="own-avatar-group">{data.map((row) => renderAssignee(row))}</div>;
  };

  const updateTaskSelection = (data) => {
    const { isChecked, _id, title } = data;
    if (isChecked) {
      let tmpArr1 = deleteTaskArr;
      tmpArr1.push({
        id: _id,
        title: title
      });
      if (tmpArr1.length > 0) {
        setDelBtnEnable(true);
      }
      setDeleteTaskArr(tmpArr1);
    } else {
      let tmpArr2 = deleteTaskArr.filter((x) => x.id !== _id);
      if (tmpArr2.length < 1) {
        setDelBtnEnable(false);
      }
      setDeleteTaskArr(tmpArr2);
    }
  };

  // ** Renders task tags
  const renderTags = (arr) => {
    // const labelColors = {
    //   App: 'info',
    //   UX: 'success',
    //   Images: 'warning',
    //   Forms: 'success',
    //   'Code Review': 'danger',
    //   'Charts & Maps': 'primary'
    // };

    return arr.map((item) => (
      <Badge className="text-capitalize" key={item} color={labelColors[item]} pill>
        {item}
      </Badge>
    ));
  };

  // ** Search Tasks
  const taskSearch = (searchParams) => {
    let resultData = taskSearchResult;
    if (searchParams.q) {
      resultData = taskSearchResult.filter((x) => {
        let searchTxt = `${x.title}${x.description}${x.labels}`;
        x.assignedTo.forEach((element) => {
          searchTxt += element.title;
        });
        return searchTxt.toLowerCase().indexOf(searchParams.q) > -1;
      });
    }
    setTaskSearchResult(resultData);
  };

  // ** Renders Avatar
  const renderAvatar = (obj) => {
    const item = obj.assignedTo;

    return item.length ? (
      renderAssignees(item)
    ) : (
      <Avatar img={blankAvatar} imgHeight="32" imgWidth="32" />
    );
  };

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
        <Card className="overflow-hidden">
          <div className="react-dataTable">
            <DataTable
              noHeader
              subHeader
              sortServer
              pagination
              responsive
              paginationServer
              columns={columns}
              onSort={handleSort}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
              subHeaderComponent={<CustomTableHeader />}
              data={dataToRender()}
              onSelectedRowsChange={() => {}}
              selectableRows
            />
          </div>
        </Card>
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
      <PerfectScrollbar
        className="list-group task-list-wrapper bg-dark bg-opacity-10"
        options={{ wheelPropagation: false }}
      >
        {goalView === '1' ? renderListTasks() : ''}
      </PerfectScrollbar>
    </div>
  );
};

export default TaskList;
