// ** React Imports
import { Fragment, useState, useEffect, useMemo, useCallback } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiBorderRadius, BiUser } from 'react-icons/bi';
import { BiCalendarEvent } from 'react-icons/bi';
import { BsPrinter } from 'react-icons/bs';
import { MdAddIcCall } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { AiFillCaretDown } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
// import PopConfirm from 'react-popconfirm'
// ** import from react-feather
import { Check, MoreVertical, Trash2, X } from 'react-feather';
// ** New Member Sidebar
import Sidebar from './Sidebar';
import CSVReader from 'react-csv-reader';
// import csv for export csv table
import { CSVLink } from 'react-csv';
// for PDF export
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// ** Table Columns
import useColumns from './useColumns';
// import member contacts and positions
// import {
//   useGetMemberContacts,
//   useGetMemberPosition
// } from '../../../../requests/contacts/member-contacts';

// ** Store & Actions
import { getAllData, getData } from '../store';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  MemberContactFetchAction,
  totalMemberCountAction,
  totalActiveMemberCountAction,
  totalPastDueMemberCountAction,
  totalFormerMemberCountAction,
  contactFileUploadAction,
  contactImportAction,
  MemberNoteFetchAction,
  //tags Fetch
  fetchTagsAction,
  deleteMemberContact,
  MemberNoteAddAction,
  MemberNoteDeleteAction,
  MemberNoteEditAction
} from '../store/actions';
import Avatar from '@components/avatar';
import { importProcessingReset } from '../store/reducer';
// ** Third Party Components
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown, Share, FileText, File, Upload, TrendingUp, Download } from 'react-feather';
// ** Utils
import { selectThemeColors } from '@utils';
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  FormText
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { deleteContactReset } from '../store/reducer';
import useMessage from '../../../../lib/useMessage';
import BorderStyle from 'pdf-lib/cjs/core/annotation/BorderStyle';
import AddProgression from './AddProgression';
import MergeModal from './MergeModal';
import { setSelectedRows } from '../../../apps/filemanager/store';
// ** Table Header
const CustomHeader = ({
  store,
  memberStore,
  tableData,
  toggleSidebar,
  handlePerPage,
  showdelete,
  rowsPerPage,
  handleFilter,
  setContactImportModal,
  setIsMergeModalOpen
}) => {
  const selectedRows = useSelector((state) => state.filemanager.selectedRows);
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(store?.data[0]);
    // const keys = Object.keys(array)
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;
        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  }
  // for CSV export
  // const tableData = memberStore?.contacts?.list
  const formatedData =
    tableData &&
    tableData.map(
      (
        { _id, userId, photo, tags, isFormer, isDelete, ranks, files, others, __v, ...rest },
        index
      ) => {
        const sl = index + 1;
        const restData = { sl, ...rest };
        const { address } = { ...rest };
        const reorderedAddress = {
          city: null,
          street: null,
          zipCode: null,
          state: null,
          country: null
        };
        const newAddressData = Object.assign(reorderedAddress, address);
        const addressValues = Object.values(newAddressData);
        const joinedAddressValues = addressValues
          .filter((x) => typeof x === 'string' && x.length > 0)
          .join(', ');
        /* if (joinedAddressValues === '') {
            joinedAddressValues = 'N/A'
        } */
        const fullAddress = { address: joinedAddressValues };
        const finalData = Object.assign(restData, fullAddress);
        return finalData;
      }
    );
  // csv headers
  const headers = [
    { label: 'Serial', key: 'sl' },
    { label: 'Member Name', key: 'fullName' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Gender', key: 'gender' },
    { label: 'Address', key: 'address' },
    { label: 'Status', key: 'status' },
    { label: 'Note', key: 'note' },
    { label: 'Company Phone', key: 'companyPhone' },
    { label: 'Company Email', key: 'companyEmail' },
    { label: 'Type', key: 'type' },
    { label: 'Company', key: 'company' },
    { label: 'Position', key: 'position' },
    { label: 'Social Links', key: 'socialLinks' },
    { label: 'Payment Methods', key: 'paymentMethods' }
  ];
  const csvReport = {
    filename: 'members.csv',
    headers: headers,
    data: formatedData
  };
  // Hover on CSV
  const [isHover, setIsHover] = useState(false);
  const [openAddProgression, setOpenAddProgression] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  // for PDF export
  const columns = [
    { title: 'Sl', field: 'sl' },
    { title: 'Member', field: 'fullName' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone', type: 'numeric' },
    { title: 'Gender', field: 'gender' },
    { title: 'Address', field: 'address' },
    { title: 'Status', field: 'status' },
    { title: 'Note', field: 'note' },
    { title: 'Company Phone', field: 'companyPhone' },
    { title: 'Company Email', field: 'companyEmail' },
    { title: 'Type', field: 'type' },
    { title: 'Company', field: 'company' },
    { title: 'Position', field: 'position' },
    { title: 'Social Link', field: 'socialLink' },
    { title: 'Payment Methods', field: 'paymentMethods' }
  ];
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Member Details', 15, 10);
    doc.autoTable({
      styles: {
        fontSize: 8
      },
      theme: 'grid',
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: formatedData,
      horizontalPageBreak: true,
      headStyles: {
        halign: 'center',
        valign: 'middle',
        fontSize: 7,
        fillColor: ['#f3f2f7'],
        textColor: '#202c33',
        tableWidth: 'auto'
      },
      bodyStyles: {
        textColor: 'black'
      }
    });
    doc.save('members.pdf');
  };
  // temp value store
  const [tempValue, setTempValue] = useState('');
  let typingTimer; //timer identifier
  let doneTypingInterval = 500; //time in ms (500 ms)
  function doneTyping(val) {
    handleFilter(val);
  }
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row className="mb-2 border p-2">
        <h4>Filters</h4>
        <Col md="3">
          <Label for="role-select">Position</Label>
          <Select
            isClearable={false}
            // value={currentRole}
            // options={roleOptions}
            className="react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
          // onChange={(data) => {
          //   setCurrentRole(data);
          // }}
          />
        </Col>
        <Col className="my-md-0 my-1" md="3">
          <Label for="plan-select">Member Type</Label>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
          // options={planOptions}
          // value={currentPlan}
          // onChange={(data) => {
          //   setCurrentPlan(data);
          // }}
          />
        </Col>
        <Col md="3">
          <Label for="status-select">Status</Label>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
          // options={statusOptions}
          // value={currentStatus}
          // onChange={(data) => {
          //   setCurrentStatus(data);
          // }}
          />
        </Col>
        <Col md="3">
          <Label for="status-select">Tag</Label>
          <Select
            // isMulti
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
          // options={tags}
          // value={currentTag}
          // onChange={(data) => {
          //   setCurrentTag(data);
          // }}
          />
        </Col>
      </Row>
      <Row>
        <Col xl="" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Show</label>
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
          xl="8"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              // value={tempValue}
              onChange={(e) => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => doneTyping(e.target.value), doneTypingInterval);
              }}
            />
          </div>
          <div className="d-flex text-center">
            {showdelete ? (
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
            ) : (
              ''
            )}
            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setOpenAddProgression(true)}
              >
                {/* <BiUser size={16} /> */}
                <TrendingUp size={16} />
              </Button>
            </div>
            <div>
              <Button className="btn-icon me-1" outline color="primary">
                <BiCalendarEvent size={16} />
              </Button>
            </div>
            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                disabled={selectedRows.length === 0}
                onClick={() => setIsMergeModalOpen(true)}
              >
                <BsPrinter size={16} />
              </Button>
            </div>

            <div>
              <Button.Ripple
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setContactImportModal((p) => !p)}
              >
                {/* <Upload size={16} /> */}
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
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    // downloadCSV(store.data)
                  }}
                >
                  <FileText className="font-small-4 me-50" />
                  {tableData && (
                    <CSVLink {...csvReport}>
                      <span
                        className="align-middle"
                        style={{
                          color: isHover ? '#7367f0' : '#b4b7bd'
                        }}
                      >
                        CSV
                      </span>
                    </CSVLink>
                  )}
                </DropdownItem>
                {tableData && (
                  <DropdownItem className="w-100" onClick={() => downloadPdf()}>
                    <File className="font-small-4 me-50" />
                    <span className="align-middle">PDF</span>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
            <Button
              style={{ fontSize: '12px' }}
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              Add New Member
            </Button>
          </div>
        </Col>
      </Row>
      <AddProgression
        setOpenAddProgression={setOpenAddProgression}
        openAddProgression={openAddProgression}
      />
    </div>
  );
};
const UsersList = (props) => {
  const { className } = props;
  const [modal, setModal] = useState(false);
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  const toggle = () => setModal(!modal);
  const [editModalData, setEditModalData] = useState({});
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  const notify = () => toast.success(<ToastContent message="Note Edited successfully" />);
  // get all member's data from db
  //// const { data: tableData, refetch: memberRefetch } = useGetMemberContacts();

  //** fake DB
  const tableData = [
    {
      "_id": "63e913f0408e22497b0fd128",
      "userId": "63da321c647a1d1c5e9d016a",
      "fullName": "testClient",
      "email": "000@gmail.com",
      "phone": "",
      "photo": "",
      "gender": "",
      "address": "",
      "country": "",
      "status": "active",
      "note": "",
      "tags": [],
      "companyPhone": "",
      "companyEmail": "",
      "type": "individual",
      "company": "",
      "position": "",
      "isFormer": false,
      "isDelete": false,
      "socialLinks": [],
      "ranks": [],
      "files": [],
      "others": [],
      "paymentMethods": [],
      "__v": 0
    },
    {
      "_id": "63e917ecdb3ec39e23c92f07",
      "userId": "63da321c647a1d1c5e9d016a",
      "fullName": "01-Client",
      "email": "01@gmail.com",
      "phone": "123456789",
      "photo": "",
      "gender": "",
      "address": "",
      "country": "",
      "status": "active",
      "note": "",
      "tags": [],
      "companyPhone": "",
      "companyEmail": "",
      "type": "individual",
      "company": "",
      "position": "",
      "isFormer": false,
      "isDelete": false,
      "socialLinks": [],
      "ranks": [],
      "files": [],
      "others": [],
      "paymentMethods": [],
      "__v": 0
    },
    {
      "_id": "63e9188ddb3ec39e23c92f21",
      "userId": "63da321c647a1d1c5e9d016a",
      "fullName": "test testClient",
      "email": "tt@gmail.com",
      "phone": "456789123",
      "photo": "",
      "gender": "",
      "address": "",
      "country": "",
      "status": "active",
      "note": "",
      "tags": [],
      "companyPhone": "",
      "companyEmail": "",
      "type": "individual",
      "company": "",
      "position": "",
      "isFormer": false,
      "isDelete": false,
      "socialLinks": [],
      "ranks": [],
      "files": [],
      "others": [],
      "paymentMethods": [],
      "__v": 0
    }
  ]
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);
  const memberStore = useSelector((state) => state.memberContact);
  // table columns
  const { success } = useMessage();
  // Delete Contact Modal
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });
  const {
    deleteContact: { isSuccess: deleteSuccess, isLoading: deleteLoading }
  } = useSelector((state) => state.memberContact);
  useMemo(() => {
    if (deleteSuccess) {
      // Reset Store
      dispatch(deleteContactReset());
      // Refetch All Counts
      dispatch(totalMemberCountAction());
      dispatch(totalActiveMemberCountAction());
      dispatch(totalPastDueMemberCountAction());
      dispatch(totalFormerMemberCountAction());
      dispatch(fetchTagsAction());
      // show Message
      success('contact Deleted Successfully');
      // Hide modal
      setDeleteModal({
        id: '',
        show: false
      });
    }
  }, [deleteSuccess]);
  // table columns
  const { columns } = useColumns({ setDeleteModal }, { toggle });
  const ToastContent = ({ message }) => (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title fw-bold">{message}</h6>
        </div>
      </div>
    </Fragment>
  );
  // ** States
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Select Position'
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  });

  const [currentTag, setCurrentTag] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  });
  // Contact import modal
  const [contactImportModal, setContactImportModal] = useState(false);
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [contactImportStep, setContactImportStep] = useState('first');
  const [contactImportCsvFile, setContactImportCsvFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [showdelete, setShowdelete] = useState(false);

  function onchangeImportContact(index, column, value) {
    let newData = [];
    let i = 0;
    for (let each of contacts) {
      if (i === index) {
        newData.push({ ...each, [column]: value });
      } else {
        newData.push(each);
      }
      i++;
    }
    setContacts(newData);
  }
  // Popover
  // const [popoverOpen, setPopoverOpen] = useState(false)
  function fetchData() {
    dispatch(
      MemberContactFetchAction({
        sortType: sort,
        sortKey: sortColumn,
        text: searchTerm,
        page: currentPage,
        pageSize: rowsPerPage,
        position: currentRole.value,
        status: currentStatus.value,
        type: String(currentPlan.value).toLowerCase(),
        status: String(currentStatus.value).toLowerCase(),
        tag: currentTag.value
      })
    );
    dispatch(MemberNoteFetchAction());
  }
  // ** Get data on mount
  useEffect(() => {
    fetchData();
  }, [
    dispatch,
    sort,
    sortColumn,
    currentPage,
    currentRole,
    currentPlan,
    currentStatus,
    rowsPerPage,
    searchTerm,
    currentTag
  ]);
  // ** get State data on mount
  useEffect(() => {
    dispatch(totalMemberCountAction());
    dispatch(totalActiveMemberCountAction());
    dispatch(totalPastDueMemberCountAction());
    dispatch(totalFormerMemberCountAction());
    dispatch(fetchTagsAction());
  }, [dispatch]);
  // Search By Tags
  const [tags, setTags] = useState([]);
  useMemo(() => {
    if (
      !memberStore?.contactUpload?.fileProcessing &&
      memberStore?.contactUpload?.contacts?.length > 0
    ) {
      setContactImportStep('second');
      setContacts(memberStore.contactUpload.contacts);
    } else {
      setContactImportStep('first');
    }
    if (memberStore.contactUpload.uploadState === 'success') {
      setContactImportModal(false);
      // // Recall Fetch data again
      fetchData();
      // // Reset upload state
      dispatch(importProcessingReset());
      dispatch(totalMemberCountAction());
      toast.success(<ToastContent message="Contacts import successfully" />);
    }
    if (memberStore?.tags?.data?.length > 0) {
      let buildTags = memberStore?.tags?.data.map((x, i) => ({
        value: x,
        label: x,
        number: i
      }));
      buildTags = [{ value: '', label: 'Select Tag', number: buildTags.length }, ...buildTags];
      setTags(buildTags);
    }
  }, [memberStore]);
  // ** User filter options
  // Default member position options
  const roleOptions = [
    { value: '', label: 'Select Position' },
    { value: 'Owner', label: 'Owner' },
    { value: 'Assistant', label: 'Assistant' },
    { value: 'Billing', label: 'Billing' }
  ];
  // get member positions data from db
  /// const { data: positions } = useGetMemberPosition();
  // push every position to roleoptions
  // / positions?.map((p) => {
  // /   const value = p.position;
  // /   const label = p.position;
  // /   const roles = { value, label };
  // /   roleOptions.push(roles);
  // / });
  // ----------------------------------
  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'Individual', label: 'Individual' },
    { value: 'company', label: 'Company' }
  ];
  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'pending', label: 'Pending', number: 1 },
    { value: 'active', label: 'Active', number: 2 },
    { value: 'inactive', label: 'Inactive', number: 3 }
  ];
  // ** Function in get data on page change
  const handlePagination = async (page) => {
    setCurrentPage(page.selected + 1);
  };
  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };
  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
  };
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(memberStore?.contacts?.total / rowsPerPage);
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName="active"
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
  //// const dataToRender = () => {
  ////   return memberStore?.contacts?.list || [];
  //// };
  //// const noteToRender = () => {
  ////   return memberStore?.memberNote?.data || [];
  //// };

  //** fake Table data to render
  const memberData = [
    {
      "buyerInfo": {
        "firstName": "",
        "lastName": "",
        "dob": "2022-09-29T10:08:43.377Z",
        "gender": "",
        "age": ""
      },
      "status": "Active",
      "days_expire": " ",
      "day_left": " ",
      "programColor": "",
      "next_rank_name": "Orange Belt",
      "next_rank_img": "https://storage.googleapis.com/mymember-storage/All-Images/1cd12b2e-f284-4696-9a45-50aabe0cc1cb-orange.png",
      "current_rank_name": "Yellow Belt",
      "current_rank_id": "",
      "subcategory": "",
      "leadsTracking": [],
      "after_camp": [
        "After School",
        "TC Sparring"
      ],
      "memberprofileImage": "",
      "rating": 0,
      "attendence_color": "#00FF00",
      "missclass_count": 108617,
      "attendedclass_count": 0,
      "attendence_status": true,
      "rankFromRecomendedTest": [],
      "membership_details": [
        {
          "due_status": "paid",
          "paymentFrom": "false",
          "isFreeze": false,
          "whenFreeze": [],
          "isForfeit": false,
          "whenForFeit": [],
          "isTerminate": false,
          "whenTerminate": [],
          "refund": [],
          "isRefund": false,
          "schedulePayments": [],
          "membershipIds": [
            "62791e59abde1b229cbfc065"
          ],
          "studentInfo": [
            "616abecf2646ab0ea5ab832f"
          ],
          "digitalId": [],
          "documentId": [],
          "paperId": [],
          "_id": "6308848271bd967844417289",
          "membership_duration": "2",
          "mactive_date": "2022-08-26",
          "register_fees": 0,
          "start_payment_Date": "2022-10-26",
          "expiry_date": "2022-10-26",
          "totalp": 0,
          "balance": 0,
          "dpayment": 0,
          "ptype": "cash",
          "payment_time": 0,
          "payment_type": "pif",
          "payment_money": 0,
          "due_every": 0,
          "due_every_month": "no_due",
          "pay_inout": "In house",
          "membership_name": "Trial",
          "pay_latter": "cash",
          "cheque_no": "",
          "student_name": "Naresh",
          "createdBy": "champion",
          "membership_type": "Trial",
          "isEMI": false,
          "userId": "606aea95a145ea2d26e0f1ab",
          "membership_status": "Active",
          "createdAt": "2022-08-26T08:29:54.904Z",
          "updatedAt": "2022-08-26T08:29:54.992Z",
          "__v": 0
        },
        {
          "due_status": "paid",
          "paymentFrom": "false",
          "isFreeze": false,
          "whenFreeze": [],
          "isForfeit": false,
          "whenForFeit": [],
          "isTerminate": false,
          "whenTerminate": [],
          "refund": [],
          "isRefund": false,
          "schedulePayments": [],
          "membershipIds": [
            "62791de9abde1b229cbfc017"
          ],
          "studentInfo": [
            "616abecf2646ab0ea5ab832f"
          ],
          "digitalId": [],
          "documentId": [],
          "paperId": [],
          "_id": "616abecf2646ab0ea5ab832f",
          "membership_duration": "7",
          "mactive_date": "2022-08-26",
          "register_fees": 0,
          "start_payment_Date": "2023-03-26",
          "expiry_date": "2023-03-26",
          "totalp": 1330,
          "balance": 0,
          "dpayment": 1330,
          "ptype": "cash",
          "payment_time": 0,
          "payment_type": "pif",
          "payment_money": 0,
          "due_every": 0,
          "due_every_month": "no_due",
          "pay_inout": "In house",
          "membership_name": "7 Month PIF",
          "pay_latter": "cash",
          "cheque_no": "",
          "createdBy": "champion",
          "membership_type": "Beginner",
          "isEMI": false,
          "userId": "606aea95a145ea2d26e0f1ab",
          "membership_status": "Active",
          "createdAt": "2022-08-26T08:32:18.437Z",
          "updatedAt": "2022-08-26T08:32:18.564Z",
          "__v": 0
        },
      ],
      "product_details": [],
      "finance_details": [],
      "myFaimly": [],
      "myGroup": [],
      "test_purchasing": [
        "615735afb2c2af1c011818d0"
      ],
      "renewals_notes": [],
      "birthday_notes": [],
      "birthday_checklist": [],
      "last_contact_missCall": null,
      "last_contact_renewal": null,
      "missYouCall_notes": [],
      "followup_notes": [
        "630a6f78275a7b2ab05f1a6a",
        "6319c6229488bd6e9e92022c",
        "63246587c6999b5a84215fc4",
        "63246599c6999b5a84215fd2",
        "632851561dfbc305f7142d1c",
        "6329767993a3003a1d6b6621",
        "63995e7647753640034c76a1"
      ],
      "rank_update_history": [
        {
          "current_stripe": "Stripe 4",
          "candidate": "Leadership Club",
          "last_stripe_given": "2022-09-13T18:54:03.411Z"
        },
        {
          "current_stripe": "Stripe 5",
          "candidate": "Leadership Club",
          "last_stripe_given": "2022-09-13T18:54:14.289Z"
        },
      ],
      "rank_update_test_history": [
        {
          "current_rank": "No Belt",
          "program": "Little Tiger",
          "current_rank_img": " ",
          "testPaid": "2021-11-07T19:17:20.131Z",
          "promoted": "2021-11-07T19:17:20.131Z"
        }
      ],
      "isRecomCandidate": true,
      "isRecommended": false,
      "time": "2023-01-24T19:36:09.304Z",
      "isInvitee": false,
      "isSeen": true,
      "isRead": false,
      "_id": "616abecf2646ab0ea5ab832f",
      "fullName": "Naresh Priazevalli",
      "primaryPhone": "516-779-8535",
      "class_count": 128,
      "notes": "She will moving to regular class. She is been taking regular class with James in zoom class  Text",
      "studentType": "Active Student",
      "program": "Taekwondo",
      "userId": "606aea95a145ea2d26e0f1ab",
      "updatedAt": "2023-01-30T14:35:03.656Z",
      "country": "United States",
      "gender": "Male",
      "location": "United States",
      "studentBeltSize": "M",
      "rank_order": 8,
      "membership_expiry": "2023-08-13T00:00:00.000Z",
      "membership_start": "2023-01-13T00:00:00.000Z",
      "candidate": "BBC Candidate List",
      "current_stripe": "Stripe 5",
      "leadStatus": "Joined",
      "age": "-1",
      "category": "",
      "customId": "",
      "dob": "2023-01-30T10:08:00.000Z",
      "email": "",
      "intrested": "",
      "school": "",
      "secondaryNumber": "",
      "state": "",
      "street": "",
      "town": "",
      "zipPostalCode": "",
      "current_rank_img": "https://mdn.mozillademos.org/files/7693/catfront.png"
    },
    {
      "buyerInfo": {
        "firstName": "",
        "lastName": "",
        "dob": "2022-09-06T15:23:41.522Z",
        "gender": "",
        "age": ""
      },
      "status": "Active",
      "days_expire": " ",
      "day_left": " ",
      "programColor": "",
      "next_rank_name": "",
      "next_rank_img": "",
      "current_rank_name": "No Belt",
      "current_rank_id": "",
      "subcategory": "",
      "leadsTracking": [],
      "after_camp": [
        "google",
        "hello"
      ],
      "memberprofileImage": "https://storage.googleapis.com/mymember-storage/All-Images/496545b5-9a17-4cd0-9c41-c0645abb0265-avatar-s-15.jpg",
      "rating": 0,
      "attendence_color": "#00FF00",
      "missclass_count": 108617,
      "attendedclass_count": 1,
      "attendence_status": true,
      "rankFromRecomendedTest": [],
      "membership_details": [
        {
          "due_status": "due",
          "paymentFrom": "false",
          "isFreeze": false,
          "whenFreeze": [],
          "isForfeit": false,
          "whenForFeit": [],
          "isTerminate": false,
          "whenTerminate": [],
          "refund": [],
          "isRefund": false,
          "schedulePayments": [
            {
              "date": "2022-12-01",
              "Id": "0875a150-385b-4577-be04-bf800f35b56e",
              "Amount": 9990,
              "status": "due",
              "ptype": "cash",
              "createdBy": ""
            }
          ],
          "membershipIds": [
            "624df2cb187936324755ee21"
          ],
          "studentInfo": [
            "616abecf2646ab0ea5ab8325"
          ],
          "digitalId": [],
          "documentId": [],
          "paperId": [],
          "_id": "63666ad6821bef06051162da",
          "membership_duration": "2",
          "mactive_date": "2022-11-05",
          "register_fees": 0,
          "start_payment_Date": "2023-01-05",
          "expiry_date": "2023-01-05",
          "totalp": 10000,
          "balance": 9990,
          "dpayment": 10,
          "ptype": "cash",
          "payment_time": 1,
          "payment_type": "monthly",
          "payment_money": 9990,
          "due_every": 1,
          "due_every_month": "2022-12-05",
          "pay_inout": "In house",
          "membership_name": "📝 Name ",
          "pay_latter": "cash",
          "cheque_no": "",
          "student_name": "Dominick Amato",
          "createdBy": "champion",
          "membership_type": "Beginner",
          "isEMI": true,
          "userId": "606aea95a145ea2d26e0f1ab",
          "membership_status": "Active",
          "createdAt": "2022-11-05T13:53:26.841Z",
          "updatedAt": "2022-11-05T13:53:30.816Z",
          "__v": 0,
          "mergedDoc": "https://storage.googleapis.com/mymember-storage/All-Images/85c0be84-615e-4dfc-9a65-460306874b6a-Test.pdf"
        },
        {
          "due_status": "due",
          "paymentFrom": "false",
          "isFreeze": false,
          "whenFreeze": [],
          "isForfeit": false,
          "whenForFeit": [],
          "isTerminate": false,
          "whenTerminate": [],
          "refund": [],
          "isRefund": false,
          "schedulePayments": [
            {
              "date": "2022-12-01",
              "Id": "6d496c1d-69f8-498a-95c4-069e557602f6",
              "Amount": 9990,
              "status": "due",
              "ptype": "cash",
              "createdBy": ""
            }
          ],
          "membershipIds": [
            "624df2cb187936324755ee21"
          ],
          "studentInfo": [
            "616abecf2646ab0ea5ab8325"
          ],
          "digitalId": [],
          "documentId": [],
          "paperId": [],
          "_id": "616abecf2646ab0ea5ab832f",
          "membership_duration": "2",
          "mactive_date": "2022-11-09",
          "register_fees": 0,
          "start_payment_Date": "2023-01-09",
          "expiry_date": "2023-01-09",
          "totalp": 10000,
          "balance": 9990,
          "dpayment": 10,
          "ptype": "cash",
          "payment_time": 1,
          "payment_type": "monthly",
          "payment_money": 9990,
          "due_every": 1,
          "due_every_month": "2022-12-09",
          "pay_inout": "In house",
          "membership_name": "📝 Name ",
          "pay_latter": "cash",
          "cheque_no": "",
          "student_name": "Dominick Amato",
          "createdBy": "champion",
          "membership_type": "Beginner",
          "isEMI": true,
          "userId": "606aea95a145ea2d26e0f1ab",
          "membership_status": "Active",
          "createdAt": "2022-11-09T11:04:35.376Z",
          "updatedAt": "2022-11-09T11:04:37.866Z",
          "__v": 0,
          "mergedDoc": "https://storage.googleapis.com/mymember-storage/All-Images/5658f1c3-1bd7-413d-8ba8-85e09a39adf1-Test.pdf"
        },
      ],
      "product_details": [],
      "finance_details": [],
      "myFaimly": [],
      "myGroup": [],
      "test_purchasing": [
        "615dd6ddb826006dd6067960"
      ],
      "renewals_notes": [],
      "birthday_notes": [],
      "birthday_checklist": [],
      "last_contact_missCall": null,
      "last_contact_renewal": null,
      "missYouCall_notes": [],
      "followup_notes": [
        "631b11857b4b7a0e175212fb",
        "631b1f437b4b7a0e1752177c",
        "631b1f877b4b7a0e175217b0",
        "631f06e5469eab1528bfbc6a"
      ],
      "rank_update_history": [
        {
          "current_stripe": "Stripe 4",
          "candidate": "BBC Candidate List",
          "last_stripe_given": "2022-09-09T10:19:45.011Z"
        },
        {
          "current_stripe": "Stripe 5",
          "candidate": "BBC Candidate List",
          "last_stripe_given": "2022-09-09T10:19:56.944Z"
        },
      ],
      "rank_update_test_history": [
        {
          "current_rank": null,
          "program": "Little Tiger",
          "current_rank_img": null,
          "testPaid": "2021-11-06T14:55:07.490Z",
          "promoted": "2021-11-06T14:55:07.490Z"
        }
      ],
      "isRecomCandidate": true,
      "isRecommended": false,
      "time": "2023-01-24T19:36:09.304Z",
      "isInvitee": false,
      "isSeen": false,
      "isRead": true,
      "_id": "616abecf2646ab0ea5ab832f",
      "fullName": "Dominick Amato",
      "primaryPhone": "917-923-7578",
      "class_count": 127,
      "notes": "2/28/20 - Joined LC monthly. $200 down now, $400 more by 3/31/20. 1/25/2020-Spoke to parent about LC. Interested and will join. Initiated contract but need to finish transition. (JK)  Text",
      "studentType": "Active Student",
      "program": "Little Tiger",
      "userId": "606aea95a145ea2d26e0f1ab",
      "updatedAt": "2023-01-12T19:14:33.885Z",
      "country": "United States",
      "gender": "Male",
      "location": "United States",
      "studentBeltSize": "M",
      "rank_order": 0,
      "age": "1",
      "category": "",
      "customId": "",
      "dob": "2020-09-27T18:30:00.000Z",
      "email": "",
      "intrested": "",
      "school": "",
      "secondaryNumber": "",
      "state": "",
      "street": "",
      "town": "",
      "zipPostalCode": "",
      "candidate": "Leadership Club",
      "current_stripe": "Stripe 5",
      "leadStatus": "Warm",
      "membership_expiry": "2023-08-07T00:00:00.000Z",
      "membership_start": "2023-01-07T00:00:00.000Z"
    },
    {
      "buyerInfo": {
        "firstName": "jai",
        "lastName": "prakash",
        "age": "25",
        "dob": "1997-03-11T16:04:00.000Z",
        "gender": "Male"
      },
      "status": "Active",
      "days_expire": " ",
      "day_left": " ",
      "programColor": "",
      "next_rank_name": "LT No Belt",
      "next_rank_img": "https://storage.googleapis.com/mymember-storage/All-Images/744c5092-0cab-4418-9e72-c0a1036cf88e-No Belt.png",
      "current_rank_name": "LT No Belt",
      "current_rank_id": "",
      "subcategory": "",
      "leadsTracking": [],
      "after_camp": [],
      "memberprofileImage": " ",
      "rating": 85,
      "attendence_color": "#00FF00",
      "missclass_count": 0,
      "attendedclass_count": 1,
      "attendence_status": true,
      "rankFromRecomendedTest": [],
      "membership_details": [
        {
          "due_status": "due",
          "paymentFrom": "false",
          "isFreeze": false,
          "whenFreeze": [],
          "isForfeit": false,
          "whenForFeit": [],
          "isTerminate": false,
          "whenTerminate": [],
          "refund": [],
          "isRefund": false,
          "schedulePayments": [
            {
              "date": "2022-12-05",
              "Id": "dd095cca-b7c5-45e3-a829-ab8fb625bfb8",
              "Amount": 9990,
              "status": "due",
              "ptype": "cash",
              "createdBy": ""
            }
          ],
          "membershipIds": [
            "624df2cb187936324755ee21"
          ],
          "studentInfo": [
            "6243381df37639062b7806f9"
          ],
          "digitalId": [],
          "documentId": [],
          "paperId": [],
          "_id": "616abecf2646ab0ea5ab832f",
          "membership_duration": "2",
          "mactive_date": "2022-11-07",
          "register_fees": 0,
          "start_payment_Date": "2023-01-08",
          "expiry_date": "2023-01-08",
          "totalp": 10000,
          "balance": 9990,
          "dpayment": 10,
          "ptype": "cash",
          "payment_time": 1,
          "payment_type": "monthly",
          "payment_money": 9990,
          "due_every": 5,
          "due_every_month": "2022-12-08",
          "pay_inout": "In house",
          "membership_name": "📝 Name ",
          "pay_latter": "cash",
          "cheque_no": "",
          "student_name": "jai prakash",
          "createdBy": "champion",
          "membership_type": "Beginner",
          "isEMI": true,
          "userId": "606aea95a145ea2d26e0f1ab",
          "membership_status": "Active",
          "createdAt": "2022-11-07T19:41:43.446Z",
          "updatedAt": "2022-11-07T19:41:46.584Z",
          "__v": 0,
          "mergedDoc": "https://storage.googleapis.com/mymember-storage/All-Images/64e4280b-1e1a-4a5b-8b14-37f803bd60d1-Test.pdf"
        },
      ],
      "product_details": [],
      "finance_details": [],
      "myFaimly": [],
      "myGroup": [],
      "test_purchasing": [],
      "renewals_notes": [],
      "birthday_notes": [],
      "birthday_checklist": [],
      "last_contact_missCall": null,
      "last_contact_renewal": null,
      "missYouCall_notes": [],
      "followup_notes": [
        "6328345b1dfbc305f7142416",
        "632977dd93a3003a1d6b6700",
        "6329796493a3003a1d6b680b"
      ],
      "rank_update_history": [
        {
          "current_stripe": "Stripe 1",
          "candidate": "BBC Candidate List",
          "last_stripe_given": "2022-09-06T17:13:32.743Z"
        },
        {
          "current_stripe": "Stripe 2",
          "candidate": "BBC Candidate List",
          "last_stripe_given": "2022-09-06T17:13:42.384Z"
        },
        {
          "current_stripe": "Stripe 3",
          "candidate": "BBC Candidate List",
          "last_stripe_given": "2022-09-06T17:14:08.667Z"
        },
      ],
      "rank_update_test_history": [],
      "isRecomCandidate": true,
      "isRecommended": false,
      "time": "2022-03-29T16:38:34.954Z",
      "isInvitee": false,
      "isSeen": false,
      "isRead": false,
      "_id": "6243381df37639062b7806f9",
      "firstName": "jai prakash",
      "gender": "Male",
      "dob": "1997-03-11T16:04:00.000Z",
      "age": "25",
      "primaryPhone": "234567890",
      "email": "demo@gmail.com",
      "secondaryNumber": "852749625",
      "street": "edcvbnjk",
      "zipPostalCode": "352525241",
      "town": "ujbvcxdf",
      "country": "",
      "notes": "",
      "studentType": "Active Student",
      "school": "",
      "location": "",
      "customId": "",
      "intrested": "",
      "program": "Little Tiger",
      "category": "",
      "state": "trdcvbj",
      "userId": "606aea95a145ea2d26e0f1ab",
      "createdAt": "2022-03-29T16:47:25.550Z",
      "updatedAt": "2023-02-19T13:00:33.482Z",
      "__v": 0,
      "next_rank_id": "61e193513e3e9723659cfe62",
      "programID": "61e09ea96d9b77353e7bc532",
      "rank_order": 1,
      "current_rank_img": "https://storage.googleapis.com/mymember-storage/All-Images/744c5092-0cab-4418-9e72-c0a1036cf88e-No Belt.png",
      "candidate": "Alphanzo",
      "current_stripe": "Stripe 4",
      "leadStatus": "Hot",
      "membership_expiry": "2023-07-21T00:00:00.000Z",
      "membership_start": "2022-12-21T00:00:00.000Z",
      "last_attended_date": 1669465443018
    },
    {
      "buyerInfo": {
        "firstName": "sonu",
        "lastName": "rathod",
        "age": "21",
        "dob": "2001-06-17T00:00:00.000Z",
        "gender": "Male"
      },
      "status": "Active",
      "days_expire": " ",
      "day_left": " ",
      "programColor": "",
      "next_rank_name": "Green Belt",
      "next_rank_img": "https://storage.googleapis.com/mymember-storage/All-Images/b6f1f38d-f183-45ff-ba3e-877b8de82302-green.png",
      "current_rank_name": "Orange Belt",
      "current_rank_id": "",
      "subcategory": "",
      "leadsTracking": [
        "fb",
        "testing"
      ],
      "after_camp": [
        "Fb",
        "After school",
        "Summer Camp"
      ],
      "memberprofileImage": "https://storage.googleapis.com/mymember-storage/All-Images/37a5a600-b05d-4782-b040-86f30ba12eb4-Screenshot from 2023-01-12 00-58-31.png",
      "rating": 221,
      "attendence_color": "#00FF00",
      "missclass_count": 108614,
      "attendedclass_count": 5,
      "attendence_status": true,
      "rankFromRecomendedTest": [],
      "membership_details": [
        {
          "due_status": "due",
          "paymentFrom": "false",
          "isFreeze": false,
          "whenFreeze": [],
          "isForfeit": false,
          "whenForFeit": [],
          "isTerminate": false,
          "whenTerminate": [],
          "refund": [],
          "isRefund": false,
          "schedulePayments": [
            {
              "date": "2022-04-01",
              "Id": "a16da43c-4a0c-4738-a2b0-40ab2d1eb396",
              "Amount": 950,
              "status": "due",
              "ptype": "cash",
              "createdBy": ""
            },
            {
              "date": "2022-05-01",
              "Id": "21c096d4-8181-41dd-9cf3-97c266c780a1",
              "Amount": 950,
              "status": "due",
              "ptype": "cash",
              "createdBy": ""
            }
          ],
          "membershipIds": [
            "62138eba718a3a2a358512a6"
          ],
          "studentInfo": [
            "6231c6369670d552a3bc72a3"
          ],
          "digitalId": [],
          "documentId": [],
          "paperId": [],
          "_id": "6231c71d9670d552a3bc72c3",
          "membership_duration": "10",
          "mactive_date": "2022-03-16",
          "register_fees": 0,
          "start_payment_Date": "2023-01-16",
          "expiry_date": "2023-01-16",
          "totalp": 2000,
          "balance": 1900,
          "dpayment": 100,
          "ptype": "cash",
          "payment_time": 2,
          "payment_type": "monthly",
          "payment_money": 950,
          "due_every": 1,
          "due_every_month": "2022-04-16",
          "pay_inout": "In house",
          "membership_name": "New membership",
          "pay_latter": "cash",
          "cheque_no": "",
          "createdBy": "champion",
          "membership_type": "Beginner",
          "isEMI": true,
          "userId": "606aea95a145ea2d26e0f1ab",
          "membership_status": "Active",
          "createdAt": "2022-03-16T11:16:45.779Z",
          "updatedAt": "2022-03-16T11:17:34.862Z",
          "__v": 0,
          "mergedDoc": "https://storage.googleapis.com/mymember-storage/All-Images/ba4aa72d-8021-47bc-993d-cf36cdfc43e8-Test.pdf",
          "emailToken": "pqjHTT8sfXHAjp53SRbM"
        },
        {
          "due_status": "due",
          "paymentFrom": "false",
          "isFreeze": false,
          "whenFreeze": [],
          "isForfeit": false,
          "whenForFeit": [],
          "isTerminate": false,
          "whenTerminate": [],
          "refund": [],
          "isRefund": false,
          "schedulePayments": [
            {
              "date": "2022-05-01",
              "Id": "bed913aa-90d4-4c3a-b6ee-9d689aaff144",
              "Amount": 950,
              "status": "due",
              "ptype": "cash",
              "createdBy": ""
            },
            {
              "date": "2022-06-01",
              "Id": "08ccc52c-ff1b-4624-9d19-0db758e57129",
              "Amount": 950,
              "status": "due",
              "ptype": "cash",
              "createdBy": ""
            }
          ],
          "membershipIds": [
            "62138eba718a3a2a358512a6"
          ],
          "studentInfo": [
            "6231c6369670d552a3bc72a3"
          ],
          "digitalId": [],
          "documentId": [],
          "paperId": [],
          "_id": "624b0e248d26f572643baac5",
          "membership_duration": "10",
          "mactive_date": "2022-04-04",
          "register_fees": 10,
          "start_payment_Date": "2023-02-04",
          "expiry_date": "2023-02-04",
          "totalp": 2000,
          "balance": 1900,
          "dpayment": 100,
          "ptype": "cash",
          "payment_time": 2,
          "payment_type": "monthly",
          "payment_money": 950,
          "due_every": 1,
          "due_every_month": "2022-05-04",
          "pay_inout": "In house",
          "membership_name": "New membership",
          "pay_latter": "cash",
          "cheque_no": "",
          "createdBy": "champion",
          "membership_type": "Beginner",
          "isEMI": true,
          "userId": "606aea95a145ea2d26e0f1ab",
          "membership_status": "Active",
          "createdAt": "2022-04-04T15:26:28.741Z",
          "updatedAt": "2022-04-04T15:26:28.769Z",
          "__v": 0
        },
      ],
      "product_details": [
        "624f5e5c3bbc2c5b07ac36fb",
        "627d03ccb585e968d6ff0c5f",
        "62927775034ece6bbf9906f1",
      ],
      "finance_details": [],
      "myFaimly": [],
      "myGroup": [],
      "test_purchasing": [
        "6231c6369670d552a3bc72a3",
        null,
        null,
        null,
        null,
        "6245e0ca9d102329f98db421",
        "6245e0ca9d102329f98db421",
      ],
      "renewals_notes": [],
      "birthday_notes": [],
      "birthday_checklist": [],
      "last_contact_missCall": null,
      "last_contact_renewal": null,
      "missYouCall_notes": [],
      "followup_notes": [
        "625976893497275f09bf5051",
        "625ecbeb7dfa372ec6fe1e3b",
        "625ece217dfa372ec6fe1e6e",
        "625ed7687dfa372ec6fe1e8e",
        "625ed7c47dfa372ec6fe1e9d",
      ],
      "rank_update_history": [],
      "rank_update_test_history": [
        {
          "current_rank_name": "No Belt",
          "program": "Taekwondo",
          "current_rank_img": "no data",
          "testPaid": "2022-04-06T16:34:35.532Z",
          "promoted": "2022-04-06T16:34:35.532Z"
        },
        {
          "current_rank_name": "No Belt",
          "program": "Taekwondo",
          "current_rank_img": "no data",
          "testPaid": "2022-04-06T16:38:32.201Z",
          "promoted": "2022-04-06T16:38:32.201Z"
        },
      ],
      "isRecomCandidate": true,
      "isRecommended": true,
      "time": "2022-04-02T18:41:10.986Z",
      "isInvitee": true,
      "isSeen": false,
      "isRead": false,
      "_id": "6231c6369670d552a3bc72a3",
      "fullName": "sonu rathod",
      "gender": "Male",
      "dob": "2005-09-28T18:30:00.000Z",
      "age": "17",
      "primaryPhone": "7411897682",
      "email": "ajayudayan20@gmail.com",
      "secondaryNumber": "4345456567",
      "street": "ddjq",
      "zipPostalCode": "12202",
      "town": "gaon ajef ejfehfe jefjewhekew",
      "country": "",
      "notes": "",
      "studentType": "Active Student",
      "school": "",
      "location": "",
      "customId": "23",
      "intrested": "",
      "program": "Little Tiger",
      "category": "",
      "state": "harayana",
      "userId": "606aea95a145ea2d26e0f1ab",
      "createdAt": "2022-03-16T11:12:54.631Z",
      "updatedAt": "2023-02-19T13:00:33.482Z",
      "__v": 0,
      "next_rank_id": "61926a70e953ff693a3f7178",
      "programID": "61e09c170b62bd33b2cf01a2",
      "textContent": "reply back please.",
      "current_rank_img": "https://mdn.mozillademos.org/files/7693/catfront.png",
      "rank_order": 24,
      "membership_expiry": "2023-07-22T00:00:00.000Z",
      "membership_start": "2022-12-22T00:00:00.000Z",
      "last_attended_date": 1657741357802,
      "candidate": null,
      "leadStatus": "Cold"
    },
  ]
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    );
  };
  const [notedata, setNotedata] = useState({ note: '', followUpType: '', response: '' });
  const onNoteInputChange = (e) => {
    setNotedata({ ...notedata, [e.target.name]: e.target.value });
  };
  const handleNoteSave = (e) => {
    e.preventDefault();
    if (notedata.followUpType != '' && notedata.response != '' && notedata.note != '') {
      dispatch(MemberNoteAddAction(notedata));
      toast.success(<ToastContent message="Note Added Successfully" />);
      e.target.reset();
      setNotedata({ note: '', followUpType: '', response: '' });
    } else {
      toast.error(<ToastContent message="Please enter data in all fields" />);
    }
  };
  const handleNoteUpdate = (e) => {
    e.preventDefault();
    dispatch(MemberNoteEditAction(editModalData));
    toggle2();
    toast.success(<ToastContent message="Edited :)" />);
  };
  const columnsdata = [
    {
      name: 'Date',
      selector: (row) => row.date
    },
    {
      name: 'Follow Up Type',
      selector: (row) => row.followUpType
    },
    {
      name: 'Response',
      selector: (row) => row.response
    },
    {
      name: 'Note',
      selector: (row) => row.note
    },
    {
      name: 'Action',
      selector: (row) => row.mode,
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag="span"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                setEditModalData(row);
                toggle2();
              }}
            >
              <FiEdit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="span"
              // href="/"
              className="w-100"
              onClick={(e) => {
                setDeleteModal({
                  id: row._id,
                  show: true
                });
              }}
            >
              <AiOutlineDelete size={14} className="me-50" />
              <span className="align-middle">Remove</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ];
  // const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      setShowdelete(true);
    } else {
      setShowdelete(false);
    }
    dispatch(setSelectedRows(selectedRows));
  };
  const handleEditModal = (e) => {
    setEditModalData({ ...editModalData, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      {/* <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="3">
              <Label for="role-select">Position</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="3">
              <Label for="plan-select">Member Type</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                }}
              />
            </Col>
            <Col md="3">
              <Label for="status-select">Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                }}
              />
            </Col>
            <Col md="3">
              <Label for="status-select">Tag</Label>
              <Select
                // isMulti
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={tags}
                value={currentTag}
                onChange={(data) => {
                  setCurrentTag(data);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}
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
            // data={dataToRender()}
            data={memberData}
            subHeaderComponent={
              <CustomHeader
                setContactImportModal={setContactImportModal}
                store={store}
                memberStore={memberStore}
                tableData={tableData}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                showdelete={showdelete}
                setIsMergeModalOpen={setIsMergeModalOpen}
              />
            }
            onSelectedRowsChange={handleRowSelected}
            selectableRows
          />
        </div>
      </Card>
      {/* Notes Modal */}
      <Modal
        fullscreen="lg"
        size="lg"
        centered="true"
        scrollable="false"
        isOpen={modal}
        // modalTransition={{ timeout: 100 }}
        // backdropTransition={{ timeout: 200 }}
        toggle={toggle}
        style={{ maxWidth: '80rem ' }}
        className={className}
      >
        <ModalHeader toggle={toggle}>Notes for Users</ModalHeader>
        <ModalBody>
          <Row>
            <Col xl="5" lg="5">
              <Row>
                <Col xl="6" md="6">
                  <Card
                    style={{
                      width: '100',
                      boxShadow: 'none'
                    }}
                  >
                    <img class="rounded" alt="Sample" src="https://picsum.photos/300/200" />

                    <Button className="mt-2 color-primary" color="primary">
                      Add Appointment
                    </Button>
                  </Card>
                </Col>
                <Col xl="6" md="6">
                  <div className="mb-1">
                    <MdAddIcCall size={20} className="" />
                    <Label className="px-1">516-543-9671 </Label>
                  </div>
                  <div className="mb-1">
                    <AiOutlineMail size={20} />
                    <Label className="px-1"> N/A</Label>
                  </div>
                  <div>
                    <GoLocation size={20} className="mb-4" />
                    <Label className="px-1">
                      {' '}
                      1040 46th Road. <br />
                      long island city,
                      <br />
                      NewYork-11101
                    </Label>
                  </div>
                  <p className="mx-2">Primary Note : N/A</p>
                </Col>
                <Col xl="12">
                  <Form row onSubmit={handleNoteSave}>
                    <Row>
                      <span>
                        <b>New Note</b>
                      </span>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleSelect" sm={2}></Label>
                          <Col sm={12}>
                            <Label for="exampleText">
                              <b>Follow Up Type</b>
                            </Label>
                            <Input
                              id="exampleSelect"
                              name="followUpType"
                              type="select"
                              placeholder="Select Notes"
                              onChange={onNoteInputChange}
                            >
                              <option value="">Select</option>
                              <option value="General">General</option>
                              <option value="Birthday">Birthday</option>
                              <option value="Miss You">Miss You</option>
                              <option value="Renewal">Renewal</option>
                              <option value="Other">Other</option>
                            </Input>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleSelect" sm={2}></Label>
                          <Col sm={10}>
                            <Label for="exampleText">
                              <b>Response*</b>
                            </Label>
                            <Input
                              id="exampleSelect"
                              name="response"
                              type="select"
                              onChange={onNoteInputChange}
                            >
                              <option value="">Select</option>
                              <option value="Left Message">Left Message</option>
                              <option value="No Answer">No Answer</option>
                              <option value="Answer">Answer</option>
                              <option value="Other">Other</option>
                            </Input>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col xl="11">
                        <FormGroup>
                          <Label for="exampleText">
                            <b>Notes*</b>
                          </Label>
                          <Input
                            onChange={onNoteInputChange}
                            id="exampleText"
                            name="note"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="11">
                        <div className="d-flex mt-0 justify-content-end">
                          <Button type="submit" color="primary">
                            Save Note
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col xl="7" lg="7">
              {/* <DataTable columns={columnsdata} data={noteToRender()} pagination /> */}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
      <Modal
        fullscreen="md"
        size="sm"
        centered="true"
        scrollable="false"
        isOpen={modal2}
        toggle={toggle2}
      >
        <ModalHeader toggle={toggle2}>Edit Note</ModalHeader>
        <ModalBody>
          <Col lg="12">
            <Form onSubmit={handleNoteUpdate} row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect" sm={2}></Label>
                    <Col sm={12}>
                      <Label for="exampleText">
                        <b>Follow Up Type</b>
                      </Label>
                      <Input
                        id="exampleSelect"
                        name="followUpType"
                        type="select"
                        placeholder="Select Notes"
                        onChange={handleEditModal}
                        defalutValue={editModalData.followUpType}
                      >
                        <option
                          selected={editModalData?.followUpType === 'General' ? true : false}
                          value="General"
                        >
                          General
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Birthday' ? true : false}
                          value="Birthday"
                        >
                          Birthday
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Miss You' ? true : false}
                          value="Miss You"
                        >
                          Miss You
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Renewal' ? true : false}
                          value="Renewal"
                        >
                          Renewal
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Other' ? true : false}
                          value="Other"
                        >
                          Other
                        </option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect" sm={2}></Label>
                    <Col sm={12}>
                      <Label for="exampleText">
                        <b>Response*</b>
                      </Label>
                      <Input
                        id="exampleSelect"
                        name="response"
                        type="select"
                        onChange={(e) =>
                          setEditModalData({ ...editModalData, [e.target.name]: e.target.value })
                        }
                      >
                        <option
                          selected={editModalData?.response === 'Left Message' ? true : false}
                          value="Left Message"
                        >
                          Left Message
                        </option>
                        <option
                          selected={editModalData?.response === 'No Answer' ? true : false}
                          value="No Answer"
                        >
                          No Answer
                        </option>
                        <option
                          selected={editModalData?.response === 'Answer' ? true : false}
                          value="Answer"
                        >
                          Answer
                        </option>
                        <option
                          selected={editModalData?.response === 'Other' ? true : false}
                          value="Other"
                        >
                          Other
                        </option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col xl="12">
                  <FormGroup>
                    <Label for="exampleText">
                      <b>Notes*</b>
                    </Label>
                    <Input
                      id="exampleText"
                      value={editModalData.note}
                      onChange={(e) =>
                        setEditModalData({ ...editModalData, [e.target.name]: e.target.value })
                      }
                      name="note"
                      type="textarea"
                    />
                  </FormGroup>
                </Col>
                <Col xl="12">
                  <div className="d-flex mt-0 justify-content-end">
                    <button type="submit" class="btn btn-primary">
                      Save Notes
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={contactImportModal}
        toggle={() => setContactImportModal(false)}
        className={`modal-dialog-centered ${contactImportStep === 'first' ? 'modal-sm' : 'modal-xl'
          }`}
        key={123}
      >
        <ModalHeader toggle={() => setContactImportModal(false)}>
          {contactImportStep === 'first' ? 'Choose CSV file' : 'Final Check to import '}
        </ModalHeader>
        <ModalBody>
          {contactImportStep === 'first' ? (
            <Fragment>
              <CSVReader
                onFileLoaded={(data, fileInfo, originalFile) => {
                  let contactData = [];
                  contactData = data.filter((x, i) => {
                    let isEmpty = true;
                    for (let each of Object.values(x)) {
                      if (each !== '') {
                        isEmpty = false;
                      }
                    }
                    return !isEmpty;
                  });
                  contactData = contactData.map((x, i) => {
                    let data = Object.values(x).filter((x) => x !== '');
                    return {
                      ...data
                    };
                  });

                  setContacts(contactData);
                  setContactImportStep('second');
                }}
              />
            </Fragment>
          ) : (
            <Fragment>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  alignItems: 'center'
                }}
              >
                <span style={{ textAlign: 'center', flex: 1 }}>Serial</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Full Name</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Email</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Contact</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Type</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Company</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Position</span>
              </div>
              {contacts &&
                contacts.map((contact, index) => (
                  <div
                    key={index + 1}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Input style={{ flex: 1 }} value={index + 1} />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[0]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 0, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[1]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 1, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[2]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 2, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[3]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 3, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[4]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 4, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[5]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 5, e.target.value)}
                    />
                  </div>
                ))}
            </Fragment>
          )}
        </ModalBody>
        <ModalFooter>
          {contactImportStep !== 'first' && (
            <Button
              onClick={() => {
                setContactImportStep('first');
              }}
              color="primary"
              outline
            >
              Upload Again
            </Button>
          )}
          <Button
            color="primary"
            outline
            onClick={() => {
              if (contactImportStep === 'first') {
                if (contactImportCsvFile === null) {
                  return;
                }
                // let form = new FormData()
                // form.append('file', contactImportCsvFile)
                // form.append('type', 'csv')
                // dispatch(contactFileUploadAction(form))

                // Lets Parse This Here
              } else {
                // Import Contact
                // Check if type has Error or Not
                const CheckInvalidType = contacts.find((x, i) => {
                  if (x[3] === 'individual' || x[3] === 'company') {
                    return false;
                  }
                  return true;
                });
                if (CheckInvalidType) {
                  toast.error(
                    <ToastContent message="Type Column must have value individual or company" />
                  );
                  return;
                }
                // Check Position Error
                const CheckInvalidPosition = contacts.find((x, i) => {
                  if (
                    x[5] === 'owner' ||
                    x[5] === 'assitant' ||
                    x[5] === 'billing' ||
                    x[5] === 'n/a'
                  ) {
                    return false;
                  }
                  return true;
                });

                if (CheckInvalidPosition) {
                  toast.error(
                    <ToastContent message="Position Column must have value owner / assitant / billing / n/a" />
                  );
                  return;
                }
                dispatch(contactImportAction({ contacts }));
              }
            }}
          >
            {contactImportStep === 'first' ? 'submit' : ' finish import'}
          </Button>
        </ModalFooter>
      </Modal>
      {/* // Sidebar Open */}
      <Sidebar
        memberStore={memberStore}
        tableData={tableData}
        // memberRefetch={memberRefetch}
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setCurrentPage={setCurrentPage}
      />
      {/* // Delete Modal  */}
      <Modal
        toggle={() => {
          setDeleteModal({
            id: '',
            show: false
          });
        }}
        centered
        isOpen={deleteModal.show}
      >
        <ModalBody>
          <div>
            <h3>Are you sure to Delete ?</h3>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            onClick={() => {
              setDeleteModal({
                id: '',
                show: false
              });
            }}
          >
            No
          </Button>
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              dispatch(MemberNoteDeleteAction(deleteModal?.id));
              setDeleteModal({
                id: '',
                show: false
              });
              toast.success(<ToastContent message="Deleted Successfully " />);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <MergeModal isMergeModalOpen={isMergeModalOpen} setIsMergeModalOpen={setIsMergeModalOpen} />
      {/*  */}
    </Fragment>
  );
};

export default UsersList;
