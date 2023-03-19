import React, { useState } from 'react'
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { addNewOrgLocationAction } from '../../../store/action'


export default function NewLocationModal({open,toggle,selectedOrg,dispatch}) {
    const [form,setForm] = useState({})
  const handleInputChanged = (e)=>{
      setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit = ()=>{
    dispatch(addNewOrgLocationAction(selectedOrg._id,{...form}))
    toggle()
  }
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New Location</ModalHeader>
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
        
        
      </ModalBody>
      <ModalFooter>
        <div className='d-flex justify-content-end'>
            <Button color='primary' onClick={handleSubmit}>
                Create
            </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
