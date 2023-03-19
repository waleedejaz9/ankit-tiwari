import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import {
  Button,
  Card,
  Col,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import GridView from './GridView';
import FeedView from './FeedView';
import CalendarView from './CalendarView';
import { Edit2, Twitter } from 'react-feather';
import { FcGoogle } from 'react-icons/fc';
import { CgProfile } from 'react-icons/cg';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';
import { FaYoutube } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';
import Insta from '../../../../assets/images/logo/insta.png';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import Profile from '../../../../assets/images/profile/post-media/2.jpg';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import Textarea from '../../../forms/form-elements/textarea';
import axios from 'axios';
import { toast } from 'react-toastify';

// import ComposeModal from './ComposeModal';
const WorkspaceMain = (workspaceid) => {
  const workspaceidnew = workspaceid.workspaceid;
  const [basicModal, setBasicModal] = useState(false);
  const [active, setActive] = useState('today');
  const [viewType, setViewType] = useState('Feed View');
  const [textarea, setTextarea] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [Url, setUrl] = useState('');
  const [file, setFile] = useState();
  const [social, setSocial] = useState();
  const [workspceName, setWorkspceName] = useState();

  const handleSelectSocial = (select) => {
    const socialconnect = select.map((data) => data.label);
    const data = socialconnect;
    setSocial(data);
  };

  const handleViewOneWorkSpace = () => {
    axios
      .get(`http://15.207.21.243:3000/user/viewone_workspace/${workspaceidnew}`)
      .then((resp) => {
        setWorkspceName(resp.data.data.workspacename);
        // setAllData(resp.data.data);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };
  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append('media_img', file);
    formdata.append('url', Url);
    formdata.append('desc', textarea);
    formdata.append('date', date);
    formdata.append('time', time);
    formdata.append('platform', social);
    axios
      .post(`http://15.207.21.243:3000/user/add_compose`, formdata)
      .then((res) => {
        console.log(res.data.data);
        toast.success('Composed Created Successfully');
        setTextarea('');
        setTime('');
        setDate('');
        setUrl('');
        setFile('');
        setSocial('');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggle = (tab) => {
    // if (active !== tab) {
    setActive(tab);
    // setSelectedWorkingCheckList(null)
    // setTaskTab(tab)
    // }
  };
  const handleViewType = (e) => {
    setViewType(e.target.value);
  };

  const colourOptions = [
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Google', label: 'Google' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Linkdin', label: 'Linkdin' },
    { value: 'Instagram', label: 'Instagram' }
  ];

  useEffect(() => {
    handleViewOneWorkSpace();
  }, []);

  return (
    <Fragment>
      {/* <BreadCrumbs
        breadCrumbTitle="Social Connect"
        breadCrumbParent="Marketing"
        breadCrumbActive="Workspace"
      /> */}
      <Card className="p-1">
        <Row>
          <Col sm={2} md={2} lg={2}>
            <Input type="select" onChange={handleViewType} value={viewType}>
              <option value="Grid View">Grid View</option>
              <option value="Feed View">Feed View</option>
              <option value="Calendar View">Calendar View</option>
            </Input>
          </Col>
          <Col sm={8} md={8} lg={8}>
            <Nav className="justify-content-center mb-0" tabs>
              <NavItem>
                <NavLink
                  active={active === 'today'}
                  onClick={() => {
                    toggle('today');
                  }}
                >
                  <FaFacebookSquare size={28} />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === 'completed'}
                  onClick={() => {
                    toggle('completed');
                  }}
                >
                  <FcGoogle size={28} />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  active={active === 'test-1'}
                  onClick={() => {
                    toggle('test-1');
                  }}
                >
                  <FaTwitterSquare size={28} fill="#00acee" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === 'test-2'}
                  onClick={() => {
                    toggle('test-2');
                  }}
                >
                  <BsLinkedin size={28} fill="#0A66C2" />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  active={active === 'test-3'}
                  onClick={() => {
                    toggle('test-3');
                  }}
                >
                  <img src={Insta} alt="insta" width={28} />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  active={active === 'test-4'}
                  onClick={() => {
                    toggle('test-4');
                  }}
                >
                  <FaYoutube size={28} fill="#c4302b" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === 'test-5'}
                  onClick={() => {
                    toggle('test-5');
                  }}
                >
                  <FaTiktok size={28} fill="#EE1D52" />
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col sm={2} md={2} lg={2} className="d-flex justify-content-end">
            {/* <Button color="success">
              <Edit2 size={18} className="me-1" />
              Compose
            </Button> */}

            <Button
              color="success"
              onClick={() => setBasicModal(!basicModal)}
              className="composebtn"
            >
              <Edit2 size={18} className="me-1" />
              Compose
            </Button>
          </Col>
        </Row>
      </Card>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="today">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView workspaceid={workspceName} />
          ) : (
            <CalendarView />
          )}
        </TabPane>

        <TabPane tabId="completed">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
        <TabPane tabId="test-1">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
        <TabPane tabId="test-2">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
        <TabPane tabId="test-3">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
        <TabPane tabId="test-4">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
        <TabPane tabId="test-5">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
      </TabContent>

      {/* modal compose */}
      <div>
        <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>Compose your post</ModalHeader>
          <ModalBody>
            <div className="compose-content">
              <form>
                <Row>
                  <Col md="3">
                    <div className="text-center">
                      <img
                        className="mb-1 mt-1"
                        alt="profile"
                        src={Profile}
                        style={{
                          border: '1px solid',
                          borderRadius: '4%',
                          width: '50px',
                          height: '50px'
                        }}
                      />
                    </div>
                  </Col>
                  <Col md="9">
                    <h5>Select Social Media to Upload Post</h5>

                    <Select
                      // value={social}
                      // onChange={(e) => setSocial(e.target.value)}
                      onChange={handleSelectSocial}
                      theme={selectThemeColors}
                      isMulti
                      className="react-select"
                      classNamePrefix="select"
                      defaultValue={colourOptions[0]}
                      options={colourOptions}
                      isClearable={false}
                    />
                  </Col>
                  <Col md="12" className="mt-1">
                    <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      value={textarea}
                      rows="3"
                      placeholder="write something..."
                      onChange={(e) => setTextarea(e.target.value)}
                    />
                  </Col>
                  <Col md="12" className="mt-1">
                    <label className="">Select Time and Date</label>
                    <Row>
                      <Col md="6">
                        <Input
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          type="time"
                          name=""
                        />
                      </Col>
                      <Col md="6">
                        <Input onChange={(e) => setDate(e.target.value)} type="date" name="" />
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6" className="mt-1">
                    <label className="">Add Url</label>
                    <Input
                      value={Url}
                      onChange={(e) => setUrl(e.target.value)}
                      type="text"
                      placeholder="https://www.w3.org/Provider/Style/dummy.html"
                    />
                  </Col>
                  <Col md="6" className="mt-1">
                    <label className="">Add File</label>
                    <Input onChange={(e) => setFile(e.target.files[0])} type="file" />
                  </Col>
                </Row>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                setBasicModal(!basicModal);
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>

      {/* close modal */}
    </Fragment>
  );
};
export default WorkspaceMain;
