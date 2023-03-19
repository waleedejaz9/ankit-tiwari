// ** React Imports
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NavLink, TabContent, TabPane } from 'reactstrap';
import { Menu } from 'react-feather';
import { MessageCircle, Twitch } from 'react-feather';
// import person_1 from '../../../../../assets/img/profile/pages/downloadTwo.jpeg';
import person_1 from '../../../assets/img/profile/pages/downloadTwo.jpeg';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Folder, Trash, Plus, Code } from 'react-feather';
import { CgProfile } from 'react-icons/cg';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Edit } from 'react-feather';
import { MoreVertical } from 'react-feather';
// ** Components imports live chat layout etc
import Retention from './tabs/retention';
import axios from 'axios';

// ** Reactstrap Imports
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  Modaldata,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';
import { FiSettings } from 'react-icons/fi';
const Sidebar = (props) => {
  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState(0);
  const [postData, setPostData, setCommentData] = useState([]);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);

      let facebookResponseValue = localStorage.getItem('accessToken');
      // let postId = localStorage.getItem('postId');
      console.log('Token@@@@@@@@', facebookResponseValue);
      // console.log('Token@@@@@@@@', facebookResponseValue.accessToken);

      if (facebookResponseValue) {
        axios
          .get(`http://localhost:3000/facebook/get-page-posts/${facebookResponseValue}/${tab}`)
          .then((resp) => {
            console.log('post data', resp?.data?.data);
            if (resp?.data?.data?.length) {
              setPostData(resp?.data?.data);
            }
          })
          .catch((error) => {
            console.log('Error', error);
          });
      }

      axios
        .get(
          `http://localhost:3000/facebook/get-page-posts/comments/${facebookResponseValue}/${postId}`
        )
        .then((resp) => {
          console.log('comments data', resp?.data?.data);
          if (resp?.data?.data?.length) {
            setCommentData(resp?.data?.data);
          }
        })
        .catch((error) => {
          console.log('Error', error);
        });
    }
  };

  const [modalnewsmartlist, setModalnewsmartlist] = useState(false);
  const [fbDataResponse, setData] = useState([]);
  const togglemodalnewsmartlist = () => setModalnewsmartlist(!modalnewsmartlist);

  useEffect(() => {
    let facebookResponseValue = localStorage.getItem('accessToken');

    console.log('Token@@@@@@@@', facebookResponseValue);
    // console.log('Token@@@@@@@@', facebookResponseValue.accessToken);

    if (facebookResponseValue) {
      axios
        .get(`http://localhost:3000/facebook/get-pages/${facebookResponseValue}`)
        .then((resp) => {
          console.log('pages data');
          console.log(resp);
          if (resp?.data?.data?.length) {
            console.log('@@data', resp?.data?.data);

            setActive(resp?.data?.data[0].id);
          }
          setData(resp?.data?.data);
        })
        .catch((error) => {
          console.log('Error', error);
        });
    }
  }, []);

  return (
    <>
      <Modal centered={true} isOpen={modalnewsmartlist} toggle={togglemodalnewsmartlist} size="md">
        <ModalHeader toggle={togglemodalnewsmartlist}> Client Check In</ModalHeader>
        <ModalBody className="p-2">
          <FormGroup row>
            <Label for="Smartlistname" sm={12}>
              customer Name
            </Label>
            <Col sm={12}>
              <Input
                id="smartlistfolder"
                name=" Smartlistname"
                placeholder="Custmer Name"
                type="text"
                // size = '38'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Smartlistname" sm={12}>
              customer Email or Phone
            </Label>
            <Col sm={12}>
              <Input
                id="smartlistfolder"
                name=" Smartlistname"
                placeholder="Email or Phone"
                type="text"
              />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color="btn btn-outline-danger" onClick={togglemodalnewsmartlist}>
            Cancel
          </Button>
          {'  '}
          <Button color="btn btn-primary" onClick={togglemodalnewsmartlist}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <div className="form-group-compose text-center compose-btn">
                <Link to="/add-new" className="text-light">
                  <Button className="compose-email" color="primary" block>
                    Add New
                  </Button>
                </Link>
              </div>
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <ListGroup tag="div" className="list-group-messages">
                  {fbDataResponse.length > 0
                    ? fbDataResponse.map((ele, i) => {
                        return (
                          <ListGroupItem
                            tag={NavLink}
                            onClick={() => toggleTab(ele?.id)}
                            active={active === ele?.id}
                            action
                            className="mt-1"
                          >
                            <img
                              width="35"
                              style={{ borderRadius: '50%' }}
                              src={person_1}
                              className=""
                            />

                            {/* <CgProfile size={20} className="me-75" /> */}
                            <span className="align-middle   ">{ele?.name}</span>
                            <Trash className="float-end  " size={18} />
                          </ListGroupItem>
                        );
                      })
                    : 'No Group Found'}

                  {/* <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('1')}
                    active={active === '1'}
                    action
                    className="mt-1"
                  >
                    <CgProfile size={20} className="me-75" />
                    <span className="align-middle   ">Group 1</span>
                    <Trash className="float-end  " size={18} />
                  </ListGroupItem>

                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('2')}
                    active={active === '2'}
                  >
                    <CgProfile size={20} className="me-75" />
                    <span className="align-middle">Group 2</span>
                    <Trash className="float-end  " size={18} />
                  </ListGroupItem>

                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('3')}
                    active={active === '3'}
                  >
                    <CgProfile size={20} className="me-75" />
                    <span className="align-middle">Group 3</span>
                    <Trash className="float-end  " size={18} />
                  </ListGroupItem>

                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('4')}
                    active={active === '4'}
                  >
                    <CgProfile size={20} className="me-75" />
                    <span className="align-middle">Group 4</span>
                    <Trash className="float-end  " size={18} />
                  </ListGroupItem> */}
                </ListGroup>
                <hr className="mt-5" />

                <ListGroup tag="div" className="list-group-messages  mt-2">
                  <ListGroupItem
                  // tag={NavLink}
                  // onClick={() => toggleTab('4')}
                  // active={active === '4'}
                  >
                    <span className="align-middle">Settings</span>
                    <Link to="/reputation/settings">
                      <FiSettings className="float-end  " size={18} />
                    </Link>
                  </ListGroupItem>
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>

      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="email-app-list">
            <div className="app-fixed-search d-flex d-lg-none align-items-center">
              <div
                className="sidebar-toggle d-block d-lg-none ms-1"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size="21" />
              </div>
            </div>

            <PerfectScrollbar>
              <TabContent activeTab={active}>
                {fbDataResponse.length > 0
                  ? fbDataResponse.map((element, i) => {
                      return (
                        <TabPane tabId={element?.id}>
                          <Retention
                            groupNumber={element?.name}
                            groupId={element?.id}
                            postData={postData.length > 0 ? postData : []}
                          />
                        </TabPane>
                      );
                    })
                  : 'No Data Found'}

                {/* <TabPane tabId="2">
                  <Retention groupNumber="Group 2" />
                </TabPane>
                <TabPane tabId="3">
                  <Retention groupNumber="Group 3" />
                </TabPane>
                <TabPane tabId="4">
                  <Retention groupNumber="Group 4" />
                </TabPane> */}
              </TabContent>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
