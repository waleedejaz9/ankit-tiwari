// ** React Imports
import { useState, useEffect } from 'react';

import { Plus, ChevronLeft, ChevronRight, MoreHorizontal, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

// import ListItem from '../filemanager/ListItem';

// ** Reactstrap Imports

//** useSelector from redux

//** API

const JournalSidebar = ({ collapse, handleJournalCollapse }) => {
  const [style, setStyle] = useState({ display: 'none' });
  const [basicModal, setBasicModal] = useState(false);
  return (
    <div className="project-sidebar" style={{ width: '250px', height: '100%' }}>
      <div className="sidebar-content task-sidebar journal">
        <div className="task-app-menu">
          <ListGroup
            className={`sidebar-menu-list ${collapse ? 'd-none' : 'd-block'}`}
            options={{ wheelPropagation: false }}
          >
            <div
              className="py-1 ps-1 d-flex justify-content-between align-items-center"
              style={{ marginLeft: '0.5rem' }}
            >
              <div style={{ fontSize: '20px', fontWeight: 800 }}>My Journal</div>
              <Button className="btn-icon" color="flat-dark" onClick={handleJournalCollapse}>
                {collapse ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </Button>
            </div>
            <div className="project-create-workspace-btn my-1">
              <Button color="primary" outline onClick={() => setBasicModal(!basicModal)}>
                <Plus size={14} className="me-25" />
                New Journal Create
              </Button>
            </div>
            <ListGroupItem className="pdd-1">
              <div className=" justify-content-between align-middle">
                <div className="ws-name mt-1">
                  <Link>
                    <span>All</span>
                  </Link>
                </div>
                <div className="ws-name mt-1">
                  <Link>
                    <span>Personal</span>
                  </Link>
                </div>
                <div className="ws-name  mt-1">
                  <Link>
                    <span>Personal</span>
                  </Link>
                </div>
                <div className="ws-name  mt-1">
                  <Link>
                    <span>Personal</span>
                  </Link>
                </div>
                <div className="ws-name  mt-1">
                  <Link>
                    <span>Personal</span>
                  </Link>
                </div>
                <div className="ws-name  mt-1">
                  <Link>
                    <span>Personal</span>
                  </Link>
                </div>
                <div className="ws-name  mt-1">
                  <Link>
                    <span>Personal</span>
                  </Link>
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>

      {/* modal  */}
      <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
        <ModalHeader toggle={() => setBasicModal(!basicModal)}>Create New Journal</ModalHeader>
        <ModalBody className="p-2">
          <form>
            <input type="text" placeholder="new journal" className="form-control" />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Submit</Button>

          <Button color="secondary" onClick={() => setBasicModal(!basicModal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* modal close */}
    </div>
  );
};

export default JournalSidebar;
