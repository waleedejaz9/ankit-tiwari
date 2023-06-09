/* eslint-disable no-unused-vars */
import { ArrowLeft, ArrowRight, Sun, User } from 'react-feather';
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
// import AddEmpolye from './AddEmpolye';
import {
  Row,
  Col,
  Badge,
  CardBody,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  InputGroup,
  Input,
  InputGroupText,
  Button
} from 'reactstrap';
// import DayBottomToolBar from './DayBottomToolBar';
import { FcSearch } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import WorkspaceSocial from './WorkspaceSocial.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// const baseURL = process.env.REACT_APP_API;
// console.log(baseURL);
const days = [
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
  '10pm',
  '11pm',
  '12am',
  '1am'
];

function CreateWorkspace() {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [workspace, setWorkspace] = useState('');

  const onNext = () => {
    if (workspace !== '') {
      setIsVisible(false);
    } else {
      toast.success('Please Enter Workspace Name ');
    }
  };

  // const handlelogin = (e) => {
  //   e.preventDefault();

  //   console.log(workspace, selectedTimezone);

  //   axios
  //     .post(`http://15.207.21.243:3000/user/createWorkSpace`, {
  //       workspacename: workspace,
  //       timezone: selectedTimezone
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {});
  // };
  return isVisible ? (
    <div className="d-flex  justify-content-center  ">
      <div className="w-100 shadow p-3 mb-5 bg-white rounded  p-5">
        <h1 className="text-center">Create a workspace</h1>
        <p className="text-center">
          A workspace is a group of social media channels and collaborators, a place where you can
          organize your campaigns, workflows and assets.
        </p>

        <div className="mt-1">
          <label></label>
          {/* <label>Status</label> */}
          <Row>
            <Col sm="3"></Col>
            <Col sm="6">
              <div className="text-center">
                <label>
                  <b>Workspace name</b>
                </label>
              </div>

              <Input
                // onChange={handleStaus}
                // defaultValue={statusValue}
                type="text"
                name="workspacename"
                className=""
                id="status"
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                placeholder="Enter Workspace Name"
              ></Input>
            </Col>
            <Col sm="3"></Col>
          </Row>
        </div>

        <div className="mt-1">
          <label></label>
          {/* <label>Status</label> */}
          <Row>
            <Col sm="3"></Col>
            <Col sm="6">
              <div className="text-center">
                <label>
                  <b>Workspace timezone (optional)</b>
                </label>
              </div>

              <Input
                // onChange={handleStaus}
                // defaultValue={statusValue}
                type="select"
                name="timezone"
                className=""
                value={selectedTimezone}
                id="status"
                onChange={(e) => setSelectedTimezone(e.target.value)}
              >
                <option>All Time Zone</option>
                <option value={'(GMT+05:00)Ashgabat'}>(GMT+05:00)Ashgabat</option>
                <option value={'(GMT+05:00)Dushanbe'}>(GMT+05:00)Dushanbe</option>
                <option value={'(GMT+05:00)Karachi'}>(GMT+05:00)Karachi</option>
                <option value={'(GMT+05:00)India Stardad Time'}>
                  (GMT+05:00)India Stardad Time
                </option>
              </Input>
            </Col>
            <Col sm="3"></Col>
          </Row>
        </div>
        <div className="d-flex justify-content-end p-1 mt-3">
          {/* <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button> */}
          <Link onClick={onNext}>
            <Button color="primary" className="btn-next">
              <span className="align-middle d-sm-inline-block d-none">Next</span>
              <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex  justify-content-center  ">
      <WorkspaceSocial
        workspacename={workspace}
        timezone={selectedTimezone}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </div>
  );
}
export default CreateWorkspace;

const data = [
  {
    id: 1,
    first_name: 'Sancho',
    last_name: 'Vautin',
    email: 'svautin0@yahoo.com',
    gender: 'Male',
    ip_address: '89.254.178.128'
  },
  {
    id: 2,
    first_name: 'Moshe',
    last_name: 'Haggar',
    email: 'mhaggar1@rakuten.co.jp',
    gender: 'Male',
    ip_address: '163.226.116.140'
  },
  {
    id: 3,
    first_name: 'Linus',
    last_name: 'McGiven',
    email: 'lmcgiven2@yahoo.com',
    gender: 'Male',
    ip_address: '43.48.178.43'
  },
  {
    id: 4,
    first_name: 'Sherie',
    last_name: 'Chasson',
    email: 'schasson3@parallels.com',
    gender: 'Female',
    ip_address: '220.61.179.138'
  },
  {
    id: 5,
    first_name: 'Dud',
    last_name: 'Monk',
    email: 'dmonk4@tripadvisor.com',
    gender: 'Male',
    ip_address: '166.52.51.7'
  },
  {
    id: 6,
    first_name: 'Dud',
    last_name: 'Monk',
    email: 'dmonk4@tripadvisor.com',
    gender: 'Male',
    ip_address: '166.52.51.7'
  }
];
