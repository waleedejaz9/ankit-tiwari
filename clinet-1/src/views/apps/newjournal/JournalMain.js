import { useState } from 'react';
import { Collapse, Button, Card, CardBody } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import JournalSidebar from './JournalSidebar';
import JournalList from './JournalList';
import JournalCalender from './JournalCalender';
import JournalDetail from './JournalDetail';

export default function JournalMain() {
  const [collapse, setCollapse] = useState(false);
  const handleJournalCollapse = () => setCollapse(!collapse);
  return (
    <div>
      <Card>
        <CardBody>
          <div className="project-right" style={{ float: 'left !important' }}>
            <div className="content-wrapper">
              <div className="content-body">
                <div style={{ display: 'flex', height: 'calc(100vh - 12rem)' }}>
                  <div className={`${collapse ? null : 'project-workspace-container'}`}>
                    <Collapse isOpen={!collapse} horizontal={true} delay={{ show: 200, hide: 500 }}>
                      <JournalSidebar
                        collapse={collapse}
                        handleJournalCollapse={handleJournalCollapse}
                      />
                    </Collapse>
                    <div className={`${collapse ? 'project-collapse-inactive' : 'tasks-area '}`}>
                      <div className="workspace-title">
                        {collapse ? (
                          <Button
                            className="btn-icon"
                            color="flat-dark"
                            onClick={handleJournalCollapse}
                          >
                            <ChevronRight size={14} />
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {/* <ProjectTable collapseWorkspaceSidebar={collapse} /> */}
                  <div className="Content-journal d-flex">
                    <div className="journal-cal-list p-1">
                      <JournalList />
                      {/* <JournalCalender className="mt-3" /> */}
                    </div>
                    <div className="jaornal-text">
                      <JournalDetail />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
