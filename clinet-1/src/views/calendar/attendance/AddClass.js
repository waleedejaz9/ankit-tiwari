// ** React Imports
import { useState, useEffect } from 'react';
// ** Third Party Components
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import { CheckCircle, X } from 'react-feather';
import Select, { components } from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';
import AttendanceAction from './AttendanceAction';

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ButtonGroup,
  Row,
  Col
} from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createClass, updateClass, updateWholeSeries } from './store';
import { ClientContactFetchAction } from '../../contacts/client/store/actions';
import { getUserData } from '../../../auth/utils';

//** Component imports */
import MarkAttendance from './MarkAttendance';
import Booked from './Booked';

const AddClass = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.attendance);
  // const contactsList = useSelector((state) => state.clientContact?.contacts?.list);

  //** fake data */
  const contactsList = [
    {
      _id: '63e913f0408e22497b0fd128',
      userId: '63da321c647a1d1c5e9d016a',
      fullName: 'testClient',
      email: '000@gmail.com',
      phone: '',
      photo: '',
      gender: '',
      address: '',
      country: '',
      status: 'active',
      note: '',
      tags: [],
      companyPhone: '',
      companyEmail: '',
      type: 'individual',
      company: '',
      position: '',
      isFormer: false,
      isDelete: false,
      socialLinks: [],
      ranks: [],
      files: [],
      others: [],
      paymentMethods: [],
      __v: 0
    },
    {
      _id: '63e917ecdb3ec39e23c92f07',
      userId: '63da321c647a1d1c5e9d016a',
      fullName: '01-Client',
      email: '01@gmail.com',
      phone: '123456789',
      photo: '',
      gender: '',
      address: '',
      country: '',
      status: 'active',
      note: '',
      tags: [],
      companyPhone: '',
      companyEmail: '',
      type: 'individual',
      company: '',
      position: '',
      isFormer: false,
      isDelete: false,
      socialLinks: [],
      ranks: [],
      files: [],
      others: [],
      paymentMethods: [],
      __v: 0
    },
    {
      _id: '63e9188ddb3ec39e23c92f21',
      userId: '63da321c647a1d1c5e9d016a',
      fullName: 'test testClient',
      email: 'tt@gmail.com',
      phone: '456789123',
      photo: '',
      gender: '',
      address: '',
      country: '',
      status: 'active',
      note: '',
      tags: [],
      companyPhone: '',
      companyEmail: '',
      type: 'individual',
      company: '',
      position: '',
      isFormer: false,
      isDelete: false,
      socialLinks: [],
      ranks: [],
      files: [],
      others: [],
      paymentMethods: [],
      __v: 0
    }
  ];

  const selectedClass = store?.selectedClass;

  // ** Props
  const { openAddClass, setOpenAddClass } = props;

  // ** States
  const [allDay, setAllDay] = useState(selectedClass?.allDay ? selectedClass?.allDay : false);
  const [activeTab, setActiveTab] = useState('updateClass');
  const [contacts, setContactsData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [wholeSeriesStartDate, setWholeSeriesStartDate] = useState(new Date());
  const [wholeSeriesEndDate, setWholeSeriesEndDate] = useState(new Date());
  const [isDateTimeChange, setIsDateTimeChange] = useState(false);
  const [currentRange, setCurrentRange] = useState({
    value: 0,
    label: '0'
  });
  const [classStartTime, setClassStartTime] = useState();
  const [classEndTime, setClassEndTime] = useState(moment().format('HH:mm'));
  const [classDays, setClassDays] = useState(
    selectedClass?.classDays ? selectedClass?.classDays : []
  );
  const [intialClassDays, setIntialClassDays] = useState(
    selectedClass?.classDays ? selectedClass?.classDays : []
  );
  const [classTitle, setClassTitle] = useState('');
  const [programName, setProgramName] = useState([
    {
      value: 'Little Tiger',
      label: 'Little Tiger',
      color: 'primary'
    }
  ]);
  const [updateModal, setUpdateModal] = useState(false);
  const [type, setType] = useState('');

  // ** Select Options
  const options = [
    { value: 'Little Tiger', label: 'Little Tiger', color: 'primary' },
    { value: 'Personal', label: 'Personal', color: 'danger' },
    { value: 'Family', label: 'Family', color: 'warning' },
    { value: 'Holiday', label: 'Holiday', color: 'success' },
    { value: 'ETC', label: 'ETC', color: 'info' }
  ];

  useEffect(() => {
    if (selectedClass?._id) {
      setClassTitle(selectedClass?.classTitle);
      setClassDays(selectedClass?.classDays);
      setIntialClassDays(selectedClass?.classDays);
      setProgramName(selectedClass?.programName);
      setStartDate(selectedClass?.startDate);
      setEndDate(selectedClass?.endDate);
      setWholeSeriesStartDate(selectedClass?.wholeSeriesStartDate);
      setWholeSeriesEndDate(selectedClass?.wholeSeriesEndDate);
      {
        currentRange.value != 0
          ? classStartTime
            ? setClassEndTime(
                moment(classStartTime, 'HH:mm').add(currentRange.value, 'minutes').format('HH:mm')
              )
            : setClassEndTime(
                moment(selectedClass.classStartTime, 'HH:mm')
                  .add(currentRange.value, 'minutes')
                  .format('HH:mm')
              )
          : classStartTime
          ? setClassEndTime(moment(classStartTime, 'HH:mm').format('HH:mm'))
          : setClassEndTime(selectedClass.classEndTime);
      }
    } else {
      setClassTitle('');
      setClassDays([]);
      setIntialClassDays([]);
      setStartDate(new Date());
      setEndDate(new Date());
      // setClassStartTime(moment().format("HH:mm"));
      setClassEndTime(
        moment(classStartTime, 'HH:mm').add(currentRange.value, 'minutes').format('HH:mm')
      );
      setProgramName([
        {
          value: 'Little Tiger',
          label: 'Little Tiger',
          color: 'primary'
        }
      ]);
    }
  }, [selectedClass, classStartTime, currentRange]);

  useEffect(() => {
    dispatch(
      ClientContactFetchAction({
        //  text: searchTerm,
        //  status: 'Active'
      })
    );
  }, []);

  // useEffect(() => {
  //   if (contactsList?.length > 0) {
  //     const cnt = contactsList.map((contact) => {
  //       return {
  //         ...contact,
  //         value: contact._id,
  //         label: contact.fullName
  //       };
  //     });
  //     setContactsData(cnt, 'cnt');
  //   }
  // }, [contactsList]);

  useEffect(() => {
    if (JSON.stringify(intialClassDays) !== JSON.stringify(classDays)) {
      setIsDateTimeChange(true);
    }
  }, [classDays]);

  useEffect(() => {
    const wholeSeriesPayload = {
      userId: getUserData().id,
      classId: selectedClass?._id,
      seriesId: selectedClass?.seriesId,
      classTitle,
      programName,
      wholeSeriesStartDate: moment(wholeSeriesStartDate).format('YYYY-MM-DD'),
      wholeSeriesEndDate: moment(wholeSeriesEndDate).format('YYYY-MM-DD'),
      classStartTime: classStartTime,
      classEndTime: classEndTime,
      classDays,
      allDay,
      isDateTimeChange,
      type: type
    };
    dispatch(updateWholeSeries(wholeSeriesPayload));
    setClassEndTime(selectedClass.classEndTime);
    setCurrentRange({
      value: 0,
      label: '0'
    });
  }, [type]);

  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`bullet bullet-${data.color} bullet-sm me-50`}></span>
        {data.label}
      </components.Option>
    );
  };

  // ** Close BTN
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={() => setOpenAddClass(!openAddClass)} />
  );
  /* const changeHandler = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
    }*/

  const handleAddClass = async () => {
    const payload = {
      userId: getUserData().id,
      classTitle,
      programName,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      classStartTime: classStartTime,
      classEndTime: classEndTime,
      classDays,
      allDay
    };

    if (selectedClass?._id && !selectedClass?.seriesId) {
      payload._id = selectedClass?._id;
      dispatch(updateClass(payload));
    } else if (!selectedClass?._id) {
      dispatch(createClass(payload));
    }
    setOpenAddClass(!openAddClass);
  };

  const onCheckboxBtnClick = (selected) => {
    let selectedDays = [...classDays];
    const index = selectedDays.indexOf(selected);

    if (index < 0) {
      selectedDays.push(selected);
    } else {
      selectedDays.splice(index, 1);
    }
    setClassDays([...selectedDays]);
  };

  const rangeOptions = [
    { value: 0, label: '0' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 25, label: '25' },
    { value: 30, label: '30' },
    { value: 35, label: '35' },
    { value: 40, label: '40' },
    { value: 45, label: '45' },
    { value: 50, label: '50' },
    { value: 55, label: '55' },
    { value: 60, label: '60' },
    { value: 65, label: '65' },
    { value: 70, label: '70' },
    { value: 75, label: '75' },
    { value: 80, label: '80' },
    { value: 85, label: '85' },
    { value: 90, label: '90' }
  ];

  // submit form with react Query
  return (
    <Modal
      isOpen={openAddClass}
      // className="sidebar-lg"
      style={{ width: '600px' }}
      toggle={() => setOpenAddClass(!openAddClass)}
      contentClassName="p-0 overflow-hidden"
      modalClassName="modal-slide-in event-sidebar"
    >
      <ModalHeader
        className="mb-1"
        toggle={() => setOpenAddClass(!openAddClass)}
        close={CloseBtn}
        tag="div"
      >
        {selectedClass?._id ? (
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'markAttendance'
                })}
                onClick={() => {
                  setActiveTab('markAttendance');
                }}
              >
                <h5 className="modal-title">Mark Attendance</h5>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'booked'
                })}
                onClick={() => {
                  setActiveTab('booked');
                }}
              >
                <h5 className="modal-title">Booked</h5>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'updateClass'
                })}
                onClick={() => {
                  setActiveTab('updateClass');
                }}
              >
                <h5 className="modal-title">Update Class</h5>
              </NavLink>
            </NavItem>
          </Nav>
        ) : (
          'Add Class'
        )}
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <TabContent activeTab={activeTab}>
            <TabPane tabId="updateClass">
              <Form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="mb-1 mt-1">
                  <Label className="form-label" for="label">
                    Program Name
                  </Label>
                  <Select
                    id="label"
                    value={programName}
                    options={options}
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    isClearable={false}
                    onChange={(data) => setProgramName([data])}
                    components={{
                      Option: OptionComponent
                    }}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="title">
                    Class Name <span className="text-danger">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={classTitle}
                    placeholder="Class Name"
                    onChange={(event) => setClassTitle(event.target.value)}
                  />
                </div>
                {/*------- date----*/}
                {!selectedClass?.seriesId && (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-1">
                        <Label className="form-label" for="startDate">
                          Start Date
                        </Label>
                        <Flatpickr
                          required
                          id="startDate"
                          name="startDate"
                          className="form-control"
                          onChange={(date) => setStartDate(date[0])}
                          value={selectedClass?.startDate ? selectedClass?.startDate : startDate}
                          options={{
                            enableTime: false,
                            dateFormat: 'm/d/Y',
                            minDate: 'today'
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-1">
                        <Label className="form-label" for="endDate">
                          End Date
                        </Label>
                        <Flatpickr
                          required
                          id="endDate"
                          name="endDate"
                          className="form-control"
                          onChange={(date) => setEndDate(date[0])}
                          value={selectedClass?.endDate ? selectedClass?.endDate : endDate}
                          options={{
                            enableTime: false,
                            dateFormat: 'm/d/Y',
                            minDate: startDate
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/*---------end date ---------------*/}
                {selectedClass?.seriesId && (
                  <div className="row ">
                    <div className="col-md-6">
                      <div className="mb-1">
                        <Label className="form-label" for="startDate">
                          Start Date
                        </Label>
                        <Flatpickr
                          required
                          id="wholeSeriesStartDate"
                          name="wholeSeriesStartDate"
                          className="form-control"
                          onChange={(date) => {
                            setWholeSeriesStartDate(date[0]);
                            setIsDateTimeChange(true);
                          }}
                          value={
                            selectedClass?.wholeSeriesStartDate
                              ? selectedClass?.wholeSeriesStartDate
                              : wholeSeriesStartDate
                          }
                          options={{
                            enableTime: false,
                            dateFormat: 'm/d/Y'
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-1">
                        <Label className="form-label" for="endDate">
                          End Date
                        </Label>
                        <Flatpickr
                          required
                          id="wholeSeriesEndDate"
                          name="wholeSeriesEndDate"
                          className="form-control"
                          onChange={(date) => {
                            setWholeSeriesEndDate(date[0]);
                            setIsDateTimeChange(true);
                          }}
                          value={
                            selectedClass?.wholeSeriesEndDate
                              ? selectedClass?.wholeSeriesEndDate
                              : wholeSeriesEndDate
                          }
                          options={{
                            enableTime: false,
                            dateFormat: 'Y-m-d',
                            minDate: wholeSeriesStartDate
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/*-----time---*/}
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="mb-1">
                      <Label className="form-label" for="classStartTime" required>
                        Start Time
                      </Label>
                      <Flatpickr
                        required
                        id="classStartTime"
                        name="classStartTime"
                        className="form-control"
                        onChange={(time) => setClassStartTime(moment(time[0]).format('HH:mm'))}
                        value={
                          selectedClass?.classStartTime
                            ? selectedClass?.classStartTime
                            : classStartTime
                        }
                        options={{
                          enableTime: true,
                          noCalendar: true,
                          dateFormat: 'G:i K'
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-1">
                      <Label className="form-label" for="classEndTime">
                        End Time
                      </Label>
                      <Flatpickr
                        required
                        id="classEndTime"
                        name="classEndTime"
                        className="form-control"
                        // onChange={setClassEndTime(moment(classStartTime, 'HH:mm').add(currentRange.value, 'minutes').format('HH:mm'))}
                        value={
                          classStartTime || currentRange.value != 0 || !selectedClass?.classEndTime
                            ? classEndTime
                            : selectedClass?.classEndTime
                        }
                        options={{
                          enableTime: true,
                          noCalendar: true,
                          dateFormat: 'G:i K'
                        }}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-0">
                    <div className="mb-1">
                      <Label className="form-label" for="SelectMinutes">
                        Select Minutes
                      </Label>
                      <Select
                        id="SelectMinutes"
                        name="SelectMinutes"
                        theme={selectThemeColors}
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        options={rangeOptions}
                        value={currentRange}
                        onChange={(data) => {
                          setCurrentRange(data);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="mb-1">
                            <Label className="form-label" for="location">
                                Location
                            </Label>
                            <Input
                                id="location"
                                placeholder="Appointment Location"
                            />
                        </div>
                        */}
                <div className="d-flex flex-column mb-1">
                  <Label className="form-label">Repeat Weekly on</Label>
                  <ButtonGroup className="mb-2">
                    <Button
                      color="primary"
                      onClick={() => onCheckboxBtnClick('Sunday')}
                      outline={!classDays.includes('Sunday')}
                    >
                      S
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => onCheckboxBtnClick('Monday')}
                      outline={!classDays.includes('Monday')}
                    >
                      M
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => onCheckboxBtnClick('Tuesday')}
                      outline={!classDays.includes('Tuesday')}
                    >
                      T
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => onCheckboxBtnClick('Wednesday')}
                      outline={!classDays.includes('Wednesday')}
                    >
                      w
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => onCheckboxBtnClick('Thursday')}
                      outline={!classDays.includes('Thursday')}
                    >
                      T
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => onCheckboxBtnClick('Friday')}
                      outline={!classDays.includes('Friday')}
                    >
                      F
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => onCheckboxBtnClick('Saturday')}
                      outline={!classDays.includes('Saturday')}
                    >
                      S
                    </Button>
                  </ButtonGroup>
                </div>
                {/*selectedClass?.seriesId && (
                <div className="form-switch mb-1">
                            <Input
                                id="wholeSeries"                              
                                type="switch"
                                className="me-1"
                                checked={wholeSeries}
                                name="customSwitch"
                                onChange={(e) => setWholeSeries(e.target.checked)}
                            />
                            <Label className="form-label" for="wholeSeries">
                                Update Whole series
                            </Label>
                </div>)  */}
                <div className="d-flex mb-1">
                  {selectedClass?._id ? (
                    <Button
                      className="me-1 d-flex"
                      type="submit"
                      color="primary"
                      onClick={() => {
                        setUpdateModal(true);
                      }}
                    >
                      Update Class
                    </Button>
                  ) : (
                    <Button
                      className="me-1 d-flex"
                      type="submit"
                      color="primary"
                      onClick={() => {
                        handleAddClass();
                      }}
                    >
                      Add Class
                    </Button>
                  )}

                  {selectedClass?._id && (
                    <AttendanceAction
                      classRow={selectedClass}
                      actionFrom="classModel"
                      setOpenAddClass={setOpenAddClass}
                    />
                  )}
                  <Button
                    className="d-flex"
                    color="secondary"
                    type="reset"
                    onClick={() => setOpenAddClass(!openAddClass)}
                    outline
                  >
                    Cancel
                  </Button>
                  <Modal
                    toggle={() => setUpdateModal(false)}
                    className="modal-dialog-centered"
                    isOpen={updateModal}
                  >
                    <ModalHeader className="bg-transparent" toggle={() => setUpdateModal(false)} />
                    <ModalBody className="px-sm-5 mx-50 pb-5">
                      <h3 className="text-center mb-1">Do you want to update this Class?</h3>
                      <Row>
                        <Col className="text-center mt-1" xs={12}>
                          <Button
                            className="mt-1 me-3"
                            outline
                            onClick={() => {
                              setType('single');
                              setUpdateModal(false);
                              setOpenAddClass(!openAddClass);
                            }}
                          >
                            Single Class
                          </Button>
                          <Button
                            className="mt-1"
                            color="primary"
                            onClick={() => {
                              setType('all');
                              setUpdateModal(false);
                              setOpenAddClass(!openAddClass);
                            }}
                          >
                            Whole Series
                          </Button>
                        </Col>
                      </Row>
                    </ModalBody>
                  </Modal>
                </div>
              </Form>
            </TabPane>
            <TabPane tabId="markAttendance">
              <MarkAttendance contacts={contacts} />
            </TabPane>
            <TabPane tabId="booked">
              <Booked contacts={contacts} />
            </TabPane>
          </TabContent>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export default AddClass;
//how to set am/pm timeformat in flatpickr in react.js?
