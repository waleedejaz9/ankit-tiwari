// ** React Imports
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  FormFeedback,
  NavLink,
  TabContent,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Input,
  ModalFooter,
  Label
} from 'reactstrap';
import { Menu } from 'react-feather';
import { MessageCircle, Twitch } from 'react-feather';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Folder, Trash, Plus, Code } from 'react-feather';
// ** Components imports live chat layout etc

// ** Reactstrap Imports
import { Button, ListGroup, InputGroup, ListGroupItem } from 'reactstrap';
import MemberStatistics from '../views/MemberStatistics';
import ProofTable from '../views/ProofTable';

const SideTab = (props) => {
  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState('1');
  const [open, setOpen] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState(false);
  const [newWorkspaceTitle, setNewWorkspaceTitle] = useState('');
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const toggle = () => setOpen(!open);
  const history = useHistory();
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const handleAddWorkspaceFormSubmit = () => {
    history.push('/mysocial/camgaign-edit');
    // history.push('/mysocial/submit');
    setNewWorkspace(!newWorkspace);
  };
  const handleOpenAddWorkspace = (e) => {
    e.preventDefault();
    setNewWorkspace(true);
  };

  const handleNewWorkspaceTitle = (e) => {
    e.preventDefault();
    setNewWorkspaceTitle(e.target.value);
  };
  return (
    <>
      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <div className="form-group-compose text-center compose-btn">
                <Button
                  className="compose-email"
                  color="primary"
                  block
                  onClick={handleOpenAddWorkspace}
                >
                  <Modal
                    isOpen={newWorkspace}
                    toggle={() => setNewWorkspace(!newWorkspace)}
                    className="modal-dialog-centered"
                  >
                    <ModalHeader toggle={() => setNewWorkspace(!newWorkspace)}>
                      Build & launch a new campaign
                    </ModalHeader>
                    <ModalBody>
                      <div>
                        {/* <Label className="form-label" for="validState">
                          Workspace title
                        </Label> */}
                        <Input
                          type="text"
                          id="newWorkspaceTitle"
                          name="newWorkspaceTitle"
                          placeholder="My Campaign"
                          onChange={handleNewWorkspaceTitle}
                          valid={createNewValidation}
                          invalid={!createNewValidation}
                        />
                        <FormFeedback valid={createNewValidation}>
                          {createNewValidation
                            ? 'Sweet! That name is available.'
                            : 'Oh no! That name is already taken.'}
                        </FormFeedback>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={handleAddWorkspaceFormSubmit}
                        disabled={!createNewValidation || !newWorkspaceTitle}
                      >
                        Next
                      </Button>
                      <Button color="secondary" onClick={() => setNewWorkspace(!newWorkspace)}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                  Create Campaigns
                </Button>
              </div>
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <ListGroup tag="div" className="list-group-messages">
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('1')}
                    active={active === '1'}
                    action
                  >
                    <Mail size={18} className="me-75" />
                    <span className="align-middle">Campaigns</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('2')}
                    active={active === '2'}
                  >
                    <MessageCircle size={18} className="me-75" />
                    <span className="align-middle">Statistics</span>
                  </ListGroupItem>
                  {/* <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('3')}
                    active={active === '3'}
                  >
                    <Twitch size={18} className="me-75" />
                    <span className="align-middle">Help Center</span>
                  </ListGroupItem> */}
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
            {/* <IncomeTypeFilter /> */}

            <PerfectScrollbar>
              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <ProofTable />
                </TabPane>
                <TabPane tabId="2">
                  <MemberStatistics />
                </TabPane>
                <TabPane tabId="3">
                  <ProofTable />
                </TabPane>
              </TabContent>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideTab;
