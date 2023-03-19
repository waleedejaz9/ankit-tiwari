import { Fragment, useEffect, useState } from 'react';
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import {
  Col,
  NavLink,
  Card,
  Nav,
  Row,
  TabContent,
  TabPane,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  InputGroup,
  ModalFooter,
  Button
} from 'reactstrap';
import BudetTool from './BudgetTool';
import LaborTool from './LaborTool';
import {
  Sun,
  User,
  ChevronDown,
  ChevronUp,
  Edit2,
  Plus,
  Clock,
  MoreVertical,
  Move
} from 'react-feather';
import moment from 'moment';
import AddEmpolye from './AddEmpolye';
import { data } from './data';

// const weather = [Sun]
const weekDay = [
  {
    id: 1,
    name: 'Sun'
  },
  {
    id: 2,
    name: 'Mon'
  },
  {
    id: 3,
    name: 'Tue'
  },
  {
    id: 4,
    name: 'Wed'
  },
  {
    id: 5,
    name: 'Thu'
  },
  {
    id: 6,
    name: 'Fri'
  },
  {
    id: 7,
    name: 'Sat'
  }
];

const WeekCalender = () => {
  const employeePosition = ['Unassigned', 'Manager', 'Cook', 'House Keeping', 'Reception'];
  const [selectedPage, setSelectedPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [currentDate, setCurrentDate] = useState(moment());
  const [days, setDays] = useState([]);
  const [active, setActive] = useState('1');
  const [openfooter, setopenfooter] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const colors = ['purple', 'yellow', 'orange', 'brown', 'red', 'green', 'pink'];

  const [items, setItems] = useState([
    {
      id: 1,
      employeePosition: 'Unassigned',
      name: 'Hello S',
      tracker: 0,
      startTime: '00:00',
      endTime: '00:00'
    },
    {
      id: 2,
      employeePosition: 'Unassigned',
      name: 'Antanio S',
      tracker: 0,
      startTime: '00:00',
      endTime: '00:00'
    },
    {
      id: 3,
      employeePosition: 'Unassigned',
      name: 'Sunil S',
      tracker: 0,
      startTime: '00:00',
      endTime: '00:00'
    },
    {
      id: 4,
      employeePosition: 'Unassigned',
      name: 'Sunil S',
      tracker: 0,
      startTime: '00:00',
      endTime: '00:00'
    },
    {
      id: 5,
      employeePosition: 'Unassigned',
      name: 'Sunil S',
      tracker: 0,
      startTime: '00:00',
      endTime: '00:00'
    }
  ]);

  const [dragData, setDragData] = useState({});
  const [noDrop, setNoDrop] = useState('');

  const handleDragStart = (e, id, employeePosition) => {
    setDragData({ id: id, initialGroup: employeePosition });
  };

  const handleDragEnter = (e, employeePosition) => {
    if (employeePosition === 'Unassigned') {
      setNoDrop('Unassigned');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    setNoDrop('');
  };

  const changeCategory = (itemId, employeePosition) => {
    const newItems = [...items];
    newItems[itemId - 1].employeePosition = employeePosition;
    setItems([...newItems]);
  };

  const handleDrop = (e, employeePosition) => {
    setNoDrop('');
    const selected = dragData.id;
    changeCategory(selected, employeePosition);
  };

  useEffect(() => {
    setIsActive(false);
  }, []);

  const toggle = (tab) => {
    setActive(tab);
    setopenfooter(true);
  };

  const handleClickOpen = () => {
    setopenfooter(!openfooter);
  };

  useEffect(() => {
    const daysInWeek = [];
    for (let i = 0; i < 7; i++) {
      daysInWeek.push(moment().add(i, 'days'));
    }
    setDays(daysInWeek);
  }, [currentDate]);

  const handlePageChange = (event) => {
    setSelectedPage(parseInt(event.target.value));
  };

  const indexOfLastPost = selectedPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const displayData = data.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setTableData(displayData);
  }, []);

  const openScheduleModal = () => {
    setOpenModel(!openModel);
  };

  return (
    <Fragment>
      <Card>
        <div className="w-100 rounded p-1">
          <h5>Week Calendar</h5>
          <table className="w-100 ">
            <thead>
              <tr>
                <th className="border cursor-pointer" width={'250'}>
                  <div className="d-flex">
                    <div className="m-1">
                      <AddEmpolye />
                    </div>
                  </div>
                </th>
                {days.map((day) => (
                  <th className="border cursor-pointer" key={day.format('MMM DD')}>
                    <div
                      className="text-center d-flex justify-content-between"
                      style={{ marginTop: '5px', margin: '5px' }}
                    >
                      <div>
                        <h3>
                          <b>{day.format('ddd')}</b>
                        </h3>
                        <span style={{ fontWeight: '200' }}> {day.format('MMM DD')}</span>
                      </div>
                      <div className="text-secondary">
                        <div>
                          <Sun size={20} />
                          <span style={{ fontSize: '14px', margin: '2px', fontWeight: '400' }}>
                            30° F
                          </span>
                        </div>
                        <div style={{ marginTop: '8px' }}>
                          <User size={16} />
                          <span style={{ fontSize: '14px', fontWeight: '400' }}> 66</span>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <th className="border cursor-pointer p-1">Events</th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onClick={openScheduleModal}
                >
                  <Plus className="plus_icons" />
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onClick={openScheduleModal}
                >
                  <Plus className="plus_icons" />
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onClick={openScheduleModal}
                >
                  <Plus className="plus_icons" />
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onClick={openScheduleModal}
                >
                  <Plus className="plus_icons" />
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onClick={openScheduleModal}
                >
                  <Plus className="plus_icons" />
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onClick={openScheduleModal}
                >
                  <Plus className="plus_icons" />
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onClick={openScheduleModal}
                >
                  <Plus className="plus_icons" />
                </th>
              </tr>
            </tbody>
            {employeePosition.map((group) => {
              return (
                <tbody
                  onDragEnter={(e) => handleDragEnter(e, group)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, group)}
                  key={group}
                >
                  <tr
                    style={
                      group === 'Unassigned'
                        ? {
                            paddingLeft: '20px',
                            height: '30px',
                            background: '#000',
                            color: '#fff'
                          }
                        : group === 'Manager'
                        ? {
                            paddingLeft: '20px',
                            height: '30px',
                            background: 'purple',
                            color: '#fff'
                          }
                        : group === 'Reception'
                        ? {
                            paddingLeft: '20px',
                            height: '30px',
                            background: 'red',
                            color: '#fff'
                          }
                        : group === 'Cook'
                        ? {
                            paddingLeft: '20px',
                            height: '30px',
                            background: 'yellow',
                            color: '#000'
                          }
                        : {
                            paddingLeft: '20px',
                            height: '30px',
                            background: colors[employeePosition.length % colors.length],
                            color: '#fff'
                          }
                    }
                    // className={`${group === 'Unassigned' ? 'bg-dark text-white' : 'bg-success text-white'}`}
                  >
                    <th
                      // className={`${
                      //   group === 'Unassigned' ? '' : 'bg-success text-white'
                      // } cursor-pointer addScheduler-wrapper`}
                      style={
                        group === 'Unassigned'
                          ? {
                              paddingLeft: '20px',
                              height: '30px',
                              background: '#000',
                              color: '#fff'
                            }
                          : group === 'Manager'
                          ? {
                              paddingLeft: '20px',
                              height: '30px',
                              background: 'purple',
                              color: '#fff'
                            }
                          : group === 'Reception'
                          ? {
                              paddingLeft: '20px',
                              height: '30px',
                              background: 'red',
                              color: '#fff'
                            }
                          : group === 'Cook'
                          ? {
                              paddingLeft: '20px',
                              height: '30px',
                              background: 'yellow',
                              color: '#000'
                            }
                          : {
                              paddingLeft: '20px',
                              height: '30px',
                              background: colors[employeePosition.length % colors.length],
                              color: '#fff'
                            }
                      }
                    >
                      {group}
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>

                  {items
                    .filter((item) => item.employeePosition === group)
                    .map((item) => {
                      return (
                        <tr>
                          <th
                            key={item.id}
                            id={item.id}
                            className="border cursor-pointer"
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id, employeePosition)}
                            style={{ width: '200px' }}
                          >
                            <div className="d-flex" style={{ padding: '10px' }}>
                              {/* <Move size={16} /> */}
                              <div
                                className={`status-indicator ${isActive ? 'inactive' : 'active'}`}
                              ></div>
                              <img
                                src={img5}
                                className="rounded-circle me-1"
                                alt="Generic placeholder image"
                                height="40"
                                width="40"
                              />

                              <div className="d-flex align-items-center">
                                <h5 className="font-weight-bold">{item?.name}</h5>
                              </div>
                            </div>
                          </th>
                          <th
                            className="border cursor-pointer text-center addScheduler-wrapper"
                            onClick={openScheduleModal}
                          >
                            <Plus className="plus_icons" />
                          </th>
                          <th
                            className="border cursor-pointer text-center addScheduler-wrapper"
                            onClick={openScheduleModal}
                            style={{ width: '170px' }}
                          >
                            <div
                              className="d-flex justify-content-between"
                              style={{
                                background: '#ffeec9',
                                height: '25px',
                                position: 'relative',
                                top: '-20px'
                              }}
                            >
                              <div className="d-flex">
                                <div
                                  className="bg-primary"
                                  style={{ height: '25px', width: '20px' }}
                                ></div>
                                <span style={{ width: '100px', marginTop: '2px' }}>9am - 10am</span>
                              </div>
                              <Edit2
                                size={16}
                                style={{ position: 'relative', right: '5px', marginTop: '2px' }}
                              />
                            </div>
                          </th>
                          <th
                            className="border cursor-pointer text-center addScheduler-wrapper"
                            onClick={openScheduleModal}
                          >
                            <Plus className="plus_icons" />
                          </th>
                          <th
                            className="border cursor-pointer text-center addScheduler-wrapper"
                            onClick={openScheduleModal}
                          >
                            <Plus className="plus_icons" />
                          </th>
                          <th
                            className="border cursor-pointer text-center addScheduler-wrapper"
                            onClick={openScheduleModal}
                          >
                            <Plus className="plus_icons" />
                          </th>
                          <th
                            className="border cursor-pointer text-center addScheduler-wrapper"
                            onClick={openScheduleModal}
                          >
                            <Plus className="plus_icons" />
                          </th>
                          <th
                            className="border cursor-pointer text-center addScheduler-wrapper"
                            onClick={openScheduleModal}
                          >
                            <Plus className="plus_icons" />
                          </th>
                        </tr>
                      );
                    })}
                </tbody>
              );
            })}
          </table>
          <FormGroup
            style={{
              width: '100px',
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Label for="pageSelect" style={{ marginTop: '8px' }}>
              Page:
            </Label>
            <Input
              type="select"
              name="pageSelect"
              id="pageSelect"
              value={selectedPage}
              onChange={handlePageChange}
              style={{ width: '100px' }}
            >
              {Array.from({ length: Math.ceil(data.length / postsPerPage) }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Input>
          </FormGroup>
        </div>
      </Card>
      <div>
        <div className="d-flex justify-content-between">
          <div className="cursor-pointer">
            <Nav tabs>
              <NavLink
                active={active === '1'}
                className="rounded"
                onClick={() => {
                  toggle('1');
                }}
              >
                Budget Tool
              </NavLink>
              <NavLink
                active={active === '2'}
                className="rounded"
                onClick={() => {
                  toggle('2');
                }}
              >
                Setting
              </NavLink>
            </Nav>
          </div>
          <div
            onClick={handleClickOpen}
            className="shadow bg-white cursor-pointer align-items-center d-flex"
            style={{ width: '30px', height: '30px', marginTop: '20px' }}
          >
            {openfooter ? <ChevronDown /> : <ChevronUp />}
          </div>
        </div>
        <div className="w-100 shadow bg-white h-100">
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <div className="w-100 shadow bg-white rounded">
                <BudetTool handleClickOpen={handleClickOpen} openfooter={openfooter} />
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="w-100 shadow bg-white rounded">
                <LaborTool openfooter={openfooter} />
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>

      <Modal isOpen={openModel} toggle={openScheduleModal} centered style={{ maxWidth: '40%' }}>
        <ModalHeader toggle={openScheduleModal}>
          <h3>Name Here</h3>
        </ModalHeader>
        <ModalBody>
          <div>
            <div>
              <div className="d-flex ">
                <div>
                  <Label style={{ marginLeft: '10px' }}>Start Time</Label>
                  <Input type="time" style={{ width: '150px', margin: '5px' }} />
                </div>
                <div>
                  <Label style={{ marginLeft: '10px' }}>End Time</Label>
                  <Input type="time" style={{ width: '150px', margin: '5px' }} />
                </div>
              </div>
              <div className="d-flex" style={{ marginLeft: '10px' }}>
                <span>Or use common shift name </span>
                <div>
                  <MoreVertical size={24} style={{ marginLeft: '10px' }} />
                  <span style={{ marginLeft: '5px' }}>15.15 Hours</span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <h4>Apply To</h4>
              <div className="d-flex justify-content-between mt-1">
                {weekDay.map((day, id) => {
                  return (
                    <div
                      style={{
                        background: '#fff',
                        padding: '10px',
                        borderRadius: '25px',
                        border: '1px solid rgb(163 160 160)',
                        width: '80px',
                        textAlign: 'center'
                      }}
                    >
                      <h4>{day.name}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
            <FormGroup className="mt-3">
              <Label for="exampleText" className="font-weight-bold">
                <h4>Shift notes</h4>
              </Label>
              <Input id="exampleText" name="text" type="textarea" />
              <p className="mt-1">Let the employee know any important details about this shift.</p>
            </FormGroup>
          </div>
          <div className="d-flex justify-content-end">
            <Button color="danger">Cancel</Button>
            <Button color="primary" style={{ marginLeft: '10px' }}>
              Save
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default WeekCalender;
