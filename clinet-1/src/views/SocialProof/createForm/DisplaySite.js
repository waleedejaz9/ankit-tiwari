import React, { useState } from 'react';
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
  CustomInput,
  CardTitle
} from 'reactstrap';
import { ChevronDown } from 'react-feather';
import axios from 'axios';
import Select from 'react-select';
import DataTable from 'react-data-table-component';

const data = [
  {
    id: 'Alyss',
    url: 'Alyss'
  },
  {
    id: 'Shep',
    url: 'Shep'
  },
  {
    id: 'Gasper',
    url: 'Gasper'
  },
  {
    id: 'Phaedra',
    url: 'Phaedra'
  },
  {
    id: 'Conn',
    url: 'Conn'
  }
];
const columns = [
  {
    name: 'URL',
    selector: 'url',
    sortable: true
  }
];

const DisplaySite = () => {
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  // handleChange = (e) => {
  //   console.log(e.value);
  //   this.setState({ selectValue: e.value });
  // };

  // async componentDidMount() {
  //   await axios
  //     .get('http://13.127.168.84:3000/user/get_Goal')
  //     .then((resp) => {
  //       this.setState({ getData: resp.data.data });
  //       console.log('ress', resp.data.data);
  //     })
  //     .catch((err) => {
  //       console.log('object', err);
  //     });
  // }
  return (
    <>
      {/* <Card> */}
      {/* <CardHeader> */}
      <div className="AddUrlBtn">
        <Button color="primary" onClick={toggleModal} className="btn-block">
          <Modal isOpen={modal} toggle={() => setModal(!modal)} centered>
            <ModalHeader toggle={() => setModal(!modal)} className="">
              Create your Url
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="12" sm="12" className="">
                    <Label for="url">Add Display Url*</Label>
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
                  </Col>
                  <Col>
                    <div className="add-task">
                      <Button.Ripple
                        block
                        className="btn-block my-1"
                        color="primary"
                        // onClick={() => {
                        //   this.props.addTask("open");
                        //   this.props.mainSidebar(false);
                        // }}
                      >
                        Add Display Url
                      </Button.Ripple>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
          Add Display Url
        </Button>
      </div>
      {/* </CardHeader> */}
      {/* <CardBody> */}
      <DataTable
        className="react-dataTable"
        pagination
        selectableRows
        paginationPerPage={7}
        sortIcon={<ChevronDown size={10} />}
        data={data}
        // data={this.state.getData}
        columns={columns}
        noHeader
      />
      {/* </CardBody> */}
      {/* </Card> */}
    </>
  );
};
export default DisplaySite;
