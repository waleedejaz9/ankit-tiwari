import React, { useState } from 'react';
import {
    Button,
    FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import { addNewOrgAction } from '../../../store/action';
import { setOrgs } from '../../../store/reducer';

export default function CreateOrgModal({ open, toggle ,store,dispatch}) {

  const [form,setForm] = useState({})
  const handleInputChanged = (e)=>{
      setForm({...form,[e.target.name]:e.target.value,isVerified:false})
  }
  const handleSubmit = ()=>{
    dispatch(addNewOrgAction({...form}))
    toggle()
  }
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create an Organization</ModalHeader>
      <ModalBody>
        <div>
          <Label>Name</Label>
          <Input type="text" name='name' placeholder="Enter Org Name" onChange={handleInputChanged}/>
        </div>
        <div>
          <Label>Email</Label>
          <Input type="text" name='email' placeholder="Enter Org Email" onChange={handleInputChanged}/>
        </div>
        <div>
          <Label>Contact</Label>
          <Input type="number" name='contact' placeholder="Enter Org Contact Number" onChange={handleInputChanged}/>
        </div>
        <div>
          <Label>Full Address</Label>
          <Input type="text" name='address' placeholder="Enter Org Full Address" onChange={handleInputChanged}/>
        </div>
        <div>
          <Label>Location Signup Link</Label>
          <InputGroup>
            <InputGroupText>www.mymanager.com/</InputGroupText>
            <Input type='text' placeholder='Org Name' name='path' onChange={handleInputChanged}/>
            <InputGroupText>/signup</InputGroupText>
          </InputGroup>
          <FormFeedback >
          Sweet! That name is available.
          </FormFeedback>
        </div>
        
      </ModalBody>
      <ModalFooter>
        <div className='d-flex justify-content-end'>
            <Button color='primary' onClick={handleSubmit}>
                Create
            </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
