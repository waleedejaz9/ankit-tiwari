// React component
import { React, useState, Fragment, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import { useHistory } from 'react-router-dom';


// custom import
import AllTemplates from './template/AllTemplates';
import Sidebar from './template/Sidebar';

// store import
import { createFormAction } from '../store/action';



const SelectFunnel = ({ store, dispatch, form, setForm, stepper }) => {
  const [active, setActive] = useState('1');


  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createFormAction(form));
    //toggleEditor();
  };

  useEffect(() => {
    if (store && store.form._id) {
      history.push(`/form-funnel/form-setting/${store.form._id}`);
    }
  }, [store.form]);

  

  return (
    <Fragment>
      <div className="h-100">
        <Row>
          <Col md="12" className="mb-1">
            <div className="tasks-border">
              <Sidebar active={active} setActive={setActive} />

              <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
                <div className="content-header p-1">
                  <h5 className="mb-0">Select a template </h5>
                  <small>Select a template for your funnel or start from blank</small>
                </div>
                <TabContent activeTab={active}>
                  <TabPane tabId="1">
                    <AllTemplates form={form} setForm={setForm}/>
                  </TabPane>
                  <TabPane tabId="2">2</TabPane>
                  <TabPane tabId="3">3</TabPane>
                </TabContent>
                <Row className='m-1 '>
                    <Col className="d-flex flex-row-reverse">
                      <Button color="primary" onClick={handleSubmit}>
                        NEXT
                      </Button>
                      <Button className="px-1 me-1" onClick={() => stepper.previous()}>
                        BACK
                      </Button>
                    </Col>
                  </Row>
              </div>
              
            </div>
            
          </Col>
        </Row>
      </div>

      {/* <div className="overflow-hidden email-application">
      <div className="content-overlay"></div>
      <div className="content-area-wrapper container-xxl p-0 animate__animated animate__fadeIn">
        <Fragment>
          <div
            className={classnames('sidebar-left', {
              show: sidebarOpen
            })}
          >
            <div className="sidebar">
              <div className="sidebar-content email-app-sidebar">
                <div className="email-app-menu">
                  <PerfectScrollbar
                    className="sidebar-menu-list"
                    options={{ wheelPropagation: false }}
                  >
                    <div className="form-group-compose text-center compose-btn">
                      <Button color="primary">Add Template</Button>
                    </div>
                    <ListGroup tag="div" className="list-group-labels">
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('6')}
                        active={active === '6'}
                      >
                        <Users size={18} className="me-75" />
                        <span className="align-middle"></span>
                        Clients
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
              <div className="email-app-list h-75">
                <div className="app-fixed-search d-flex d-lg-none align-items-center">
                  <div
                    className="sidebar-toggle d-block d-lg-none ms-1"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu size="21" />
                  </div>
                </div>
                <div className="card p-2">
                  <h3>Select Templates</h3>
                </div>
                <PerfectScrollbar>
                  <TabContent activeTab={active}>
                    <TabPane tabId="6">
                      <Layout />
                    </TabPane>
                  </TabContent>
                  <Row>
                    <Col className="d-flex flex-row-reverse">
                      <Button color="primary" onClick={handleSubmit}>
                        NEXT
                      </Button>
                      <Button className="px-1 me-1" onClick={() => stepper.previous()}>
                        BACK
                      </Button>
                    </Col>
                  </Row>
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
      

    </div> */}
    </Fragment>
  );
};

export default SelectFunnel;
