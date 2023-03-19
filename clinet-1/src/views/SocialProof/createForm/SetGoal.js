import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText
} from 'reactstrap';
import { ChevronDown } from 'react-feather';
import axios from 'axios';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
const category = [
  { value: 'Lead', label: 'lead' },
  { value: 'Purchase', label: 'purchase' },
  { value: 'Schedule', label: 'schedule' },
  { value: 'Subscribe', label: 'subscribe' },
  { value: 'Start Trial', label: 'start trial' },
  { value: 'View Content', label: 'view content' },
  { value: 'Complete Registration', label: 'complete registration' }
];

const columns = [
  {
    name: 'GOALS',
    selector: 'category_goal',
    sortable: true
  },
  {
    name: 'CONVERTIONS',
    selector: 'convertion',
    sortable: true
  },
  {
    name: 'VALUE',
    selector: 'value',
    sortable: true
  },
  {
    name: 'URL',
    selector: 'url',
    sortable: true
  }
];
const data = [
  {
    id: 'Alyss',
    convertion: 'Alyss'
  },
  {
    id: 'Shep',
    convertion: 'Shep'
  },
  {
    id: 'Gasper',
    convertion: 'Gasper'
  },
  {
    id: 'Phaedra',
    convertion: 'Phaedra'
  },
  {
    id: 'Conn',
    convertion: 'Conn'
  }
];

const SetGoal = ({}) => {
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [conversionValue, setConversionValue] = useState('');
  const [url, setUrl] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const formData = {
    goalName,
    conversionValue,
    url,
    selectValue
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(selectValue);
    console.log(goalName);
    console.log(conversionValue);
    console.log(url);
    // setIsCreateTicketModalOpen(!isCreateTicketModalOpen);
    axios
      .post('http://15.207.21.243/user/create_goal', formData)
      .then((res) => {
        console.log('res', res.data.data);
        setIsCreateTicketModalOpen(isCreateTicketModalOpen);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCreateTicketClick = () => {
    setIsCreateTicketModalOpen(true);
  };
  return (
    <>
      <div className="btnposition">
        <Button color="primary" onClick={handleCreateTicketClick}>
          <Modal
            isOpen={isCreateTicketModalOpen}
            toggle={() => setIsCreateTicketModalOpen(!isCreateTicketModalOpen)}
            centered
          >
            <ModalHeader toggle={() => setIsCreateTicketModalOpen(!isCreateTicketModalOpen)}>
              Create your goal
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="12" md="12" sm="12">
                    <FormGroup>
                      <Label for="Category">Goal Category*</Label>
                      <Select
                        id="task-assignee"
                        className="react-select"
                        classNamePrefix="select"
                        isClearable={false}
                        options={category}
                        onChange={(data) => {
                          setSelectValue(data.value);
                        }}
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="12" md="12" sm="12" className="mb-2">
                    <FormGroup>
                      <Label for="goalName">Name your Goal*</Label>
                      <Input
                        type="text"
                        required
                        placeholder="Ex:signed up for basic plan"
                        onChange={(e) => {
                          setGoalName(e.target.value);
                        }}
                        value={goalName}
                        id="goalName"
                        name="goalName"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12" className="mb-2">
                    <Label for="firstName">Set conversion value</Label>
                    <InputGroup>
                      <InputGroupText>$</InputGroupText>

                      <Input
                        onChange={(e) => {
                          setConversionValue(e.target.value);
                        }}
                        className="form-control"
                        mask="$9999"
                        placeholder="100"
                        value={conversionValue}
                      />
                    </InputGroup>
                  </Col>

                  <Col md="12" sm="12" className="mb-2">
                    <FormGroup>
                      <Label for="url">Set goal completion URL*</Label>
                      <Input
                        type="text"
                        required
                        placeholder="URL"
                        onChange={(e) => {
                          setUrl(e.target.value);
                        }}
                        value={url}
                        id="url"
                        name="url"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <div className="add-task">
                      <Button
                        block
                        className="btn-block my-1 text-right"
                        color="primary"
                        // onClick={() => {
                        //   setIsCreateTicketModalOpen(setIsCreateTicketModalOpen);
                        // }}
                      >
                        Create Goal
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
          Create Goal
        </Button>
      </div>
      <DataTable
        className="react-dataTable"
        pagination
        selectableRows
        paginationPerPage={7}
        sortIcon={<ChevronDown size={10} />}
        data={data}
        columns={columns}
        noHeader
      />
    </>
  );
};
export default SetGoal;
