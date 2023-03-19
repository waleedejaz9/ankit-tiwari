// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
// ** Icons Imports

import { BsListCheck } from 'react-icons/bs';

import { Col, Row } from 'reactstrap';
import { Radio, Facebook, MessageCircle, MessageSquare, Mail } from 'react-feather';
// ** User Components
// Todo: move tab folders to tabs folder
import Email from '@src/views/apps/email';
import Text from '@src/views/apps/text/Text.js';
import Chat from '@src/views/apps/chat';
// import Ticket from '@src/views/apps/ticket';
import Ticket from '@src/views/apps/ticket'
import Automation from '@src/views/apps/automation';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
// ** Store & Actions
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';
// import { fetchLabelsApi } from '../tasks/label-management/store';

// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';
import CalendarComponent from '../calendar';

const Marketing = () => {
  const params = useParams();
  useEffect(() => {
    if (params.section) {
      if (params.section === 'email') {
        setActive('1');
      }
      if (params.section === 'text') {
        setActive('2');
      }
      if (params.section === 'chat') {
        setActive('3');
      }
      if (params.section === 'ticket' || params.section === 'tag') {
        setActive('4');
      }
      if (params.section === 'automation') {
        setActive('5');
      }
    }
  }, [params]);

  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <Row>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2 ">
              <NavItem>
                <NavLink
                  active={active === '1'}
                  onClick={() => toggleTab('1')}
                  className="marketing-tab"
                >
                  <Link to="/marketing/email">
                    <Mail className="font-medium-1 me-50" />
                    <span className="fs-6">Email</span>
                  </Link>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  active={active === '2'}
                  onClick={() => {
                    toggleTab('2');
                  }}
                  className="marketing-tab"
                >
                  <Link to="/marketing/text">
                    <MessageCircle className="font-medium-1 me-50" />
                    <span className="fs-6">Text</span>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '3'}
                  onClick={() => toggleTab('3')}
                  className="marketing-tab"
                >
                  <Link to="/marketing/chat">
                    <MessageSquare className="font-medium-1 me-50" />
                    <span className="fs-6">Chat</span>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '4'}
                  onClick={() => toggleTab('4')}
                  className="marketing-tab"
                >
                  <Link to="/marketing/ticket/open">
                    <MessageCircle className="font-medium-1 me-50" />
                    <span className="fs-6">Ticket</span>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '5'}
                  onClick={() => toggleTab('5')}
                  className="marketing-tab"
                >
                  <Link to="/marketing/automation">
                    <BsListCheck className="font-medium-1 me-50" />
                    <span className="fs-6">Automation</span>
                  </Link>
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <div className="overflow-hidden email-application">
                  <div className="content-overlay"></div>
                  <div className="content-area-wrapper p-0 animate__animated animate__fadeIn">
                    <Email />
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <Text />
              </TabPane>
              <TabPane tabId="3">
                <div className=" overflow-hidden chat-application">
                  <div className="content-overlay"></div>
                  <div className="header-navbar-shadow"></div>

                  <div className="content-area-wrapper animate__animated animate__fadeIn">
                    <Chat />
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="4">
                <div className=" overflow-hidden email-application">
                  <div className="content-overlay"></div>

                  <div className="content-area-wrapper animate__animated animate__fadeIn">
                    <Ticket />
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="5">
                <div className=" overflow-hidden email-application">
                  <div className="content-overlay"></div>

                  <div className="content-area-wrapper animate__animated animate__fadeIn">
                    <Automation />
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default Marketing;
