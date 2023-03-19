import React, { Fragment, useState } from 'react';
import {
  Button,
  Input,
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

export default function EditHabit({ task, toggle, type }) {
  // ** STATES
  const [activeTab, setActiveTab] = useState('1');
  const [frequency, setFrequency] = useState('day');
  const [repetition,setRepetition] = useState(21);

  const handleRepetationChanged = (e)=> setRepetition(e.target.value)
  const handleFrequencyChanged = (e)=>setFrequency(e.target.value)

  return (
    <Fragment>
      <ModalHeader toggle={toggle}>Edit Habit</ModalHeader>
      <ModalBody>
        <Label>Habit Name</Label>
        <Input type="text" placeholder="What is your new habit?" value={task.name} />
        <Label>Frequency</Label>
        <Input type="select" onChange={handleFrequencyChanged}>
          <option>Every day</option>
          <option>Every week</option>
          <option>Every month</option>
        </Input>
        {frequency !== 'day' && (
          <>
            <Label>Days per {frequency}</Label>
            <Input type="text" />
          </>
        )}
        <Label>Repetation</Label>
       <div className='d-flex justify-content-between'>
       <Input type="range" defaultValue={21} max={100} color="primary" step="1" value={repetition} onChange={handleRepetationChanged} className="w-100 my-auto me-50"/>
       <Input type='text' value={repetition} onChange={handleRepetationChanged} style={{maxWidth:"70px"}}/>
        
       </div>
        <Label>Goal</Label>
        <Input type="select">
          <option>Goal 1</option>
          <option>Goal 2</option>
          <option>Goal 3</option>
        </Input>
        <Label>Category</Label>
        <Input type="select">
          <option>Personal</option>
          <option>Business</option>
        </Input>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-end px-1">
          <Button color="primary">Save Habit</Button>
        </div>
      </ModalFooter>
    </Fragment>
  );
}
