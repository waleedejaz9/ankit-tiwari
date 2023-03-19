import React, { Fragment, useState } from 'react';
import {
  Button,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';

export default function AddGoal({ task, toggle, type }) {
  // ** STATES
  const [activeTab, setActiveTab] = useState('1');
  const [trackProgress, setTrackProgress] = useState(1);

  const handleTrackProgressChanged = (e) => {
    setTrackProgress(e.target.value);
  };
  return (
    <Fragment>
      {type === 'sub' ? (
        <ModalHeader toggle={toggle}>Add A New Sub Goal For {task.name}</ModalHeader>
      ) : (
        <ModalHeader toggle={toggle}>Add A New Goal</ModalHeader>
      )}
      <ModalBody>
        <Label>Goal Name</Label>
        <Input type="text" placeholder="What is your goal?" />

        <Label>Start Date</Label>
        <Input type="date" />

        <Label>End Date</Label>
        <Input type="date" />
        <hr />
        <Label>Track Progress By: </Label>
        <FormGroup onChange={handleTrackProgressChanged}>
          <div>
            <Input type="radio" name="trackProgressOption" value={1} />
            <Label>Total number of completed tasks</Label>
          </div>
          <div>
            <Input type="radio" name="trackProgressOption" value={2} />{' '}
            <Label>Total progress from all sub goals</Label>
          </div>
          <div>
            <Input type="radio" name="trackProgressOption" value={3} />{' '}
            <Label>Total outcome from all tasks</Label>
          </div>
          <div>
            <Input type="radio" name="trackProgressOption" value={4} />{' '}
            <Label>Manually updating current progress</Label>
          </div>
        </FormGroup>

        {['3','4'].includes(trackProgress) && (
          <div>
            <div className="d-flex justify-content-between">
              <div className='d-flex justify-content-start'>
              <Label className='my-auto pe-50'>Measure From:</Label>
              <Input type="number" style={{maxWidth:"100px"}} defaultValue={1}/>
              </div>
              <div className='d-flex justify-content-start'>
              <Label className='my-auto pe-50'>to</Label>
              <Input type="number" style={{maxWidth:"100px"}} defaultValue={100}/>
              </div>
            </div>
            <Label>Measure Label</Label>
            <Input type="text" placeholder="$, lbs, kg " />
          </div>
        )}
        {
          trackProgress==='4' && (
            <div >
              <Label >Current Progress</Label>
              <Input type="number" style={{maxWidth:"100px"}}/>
              </div>
          )
        }

        <hr />

        <div>
          <Nav tabs>
            <NavItem>
              <NavLink active={activeTab === '1'} onClick={() => setActiveTab('1')}>
                Vision
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === '2'} onClick={() => setActiveTab('2')}>
                Purposes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === '3'} onClick={() => setActiveTab('3')}>
                Obstacles
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === '4'} onClick={() => setActiveTab('4')}>
                Resources
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Input type="textarea" />
            </TabPane>
            <TabPane tabId="2">
              <Input type="textarea" />
            </TabPane>
            <TabPane tabId="3">
              <Input type="textarea" />
            </TabPane>
            <TabPane tabId="4">
              <Input type="textarea" />
            </TabPane>
          </TabContent>
          <hr />
          <Label>Optional</Label>
          <br/>
          <Label>Picture</Label>
          <Input type="file" />
          <Label>Parent Goal</Label>
          <Input type="select">
            <option>Goal 1</option>
            <option>Goal 2</option>
            <option>Goal 3</option>
          </Input>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-end">
          <Button color="primary">Save</Button>
        </div>
      </ModalFooter>
    </Fragment>
  );
}
