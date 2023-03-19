import { useState } from 'react';

import {
  Button,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';


const RecordHabit = ({task, toggle,isOpen}) => {
  

  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [newTitle, setNewTitle] = useState('');


  const confirmBtnClicked = () => {
   toggle()
  };

  const cancleBtnClicked = () => {
   toggle()
  };



  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggle}>Record a Habit</ModalHeader>
      <ModalBody>
        <div>
          <Label className="form-label" for="validState">
            Please provide details to record the habit
          </Label>

          <div >
              <Label >Today's Progress</Label>
              <div className='d-flex justify-content-start'>
              <Input type="number" /><span className='ps-50 my-auto'>lbs</span>
              </div>
              </div>
          
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
          onClick={confirmBtnClicked}
          
        >
          Submit
        </Button>
        <Button color="secondary" onClick={cancleBtnClicked}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RecordHabit;
