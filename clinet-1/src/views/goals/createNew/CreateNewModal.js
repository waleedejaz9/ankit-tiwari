import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import NewGoalWizard from './NewGoalWizard'

export default function CreateNewModal({open,toggle}) {
  return (
    <Modal size='lg'  isOpen={open}
    toggle={toggle}
    className="modal-dialog-centered">
        <ModalHeader toggle={toggle}>
Create A New Goal
        </ModalHeader>
        <ModalBody>
            <NewGoalWizard/>
        </ModalBody>
    </Modal>
  )
}
