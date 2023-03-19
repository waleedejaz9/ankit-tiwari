import React from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

export default function NewPlanModal({open,toggle,selectedOrg}) {
  return (
    <Modal toggle={toggle} isOpen={open}>
      <ModalHeader toggle={toggle}>Add a New Plan</ModalHeader>
      <ModalBody>
        <div>
          <Label> Plan Name</Label>
          <Input type="text" name='name' />
        </div>
        <div>
          <Label> Description</Label>
          <Input type="email" />
        </div>
        <div>
          <Label> Price</Label>
          <div className='d-flex justify-content-between'>
          <Input type="number"  className='w-100'/>
          <h5 className='my-auto ms-50'> $/Month</h5>
          </div>
        </div>
        
        <div className="d-flex justify-content-end my-50">
          <Button color="primary" className='me-50'>Save</Button>
          <Button color="outline-secondary" onClick={toggle}>Cancel</Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
