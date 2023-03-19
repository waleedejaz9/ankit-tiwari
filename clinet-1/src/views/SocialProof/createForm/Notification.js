import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  CustomInput,
  FormGroup,
  Label
} from 'reactstrap';
import Select from 'react-select';
// import '../../../../assets/scss/pages/campaign.scss';
import count from '../../../assets/img/svg/CountPulse.svg';
import fire from '../../../assets/img/svg/fire.svg';
import groupImg from '../../../assets/img/svg/bulkpng.png';
const category = [
  { value: 'Rounded', label: 'Rounded' },
  { value: 'Boxy', label: 'Boxy' }
];

const Notification = () => {
  const [hide, setHide] = useState(true);
  const [show, setShow] = useState(true);
  const [position, setPosition] = useState(true);

  return (
    <>
      <Row>
        <Col lg="4" md="4" sm="12">
          <Card className="cardChange hi-1">
            <CardBody className="p-0">
              <div className="firstCard">
                <img src={groupImg} alt="groupImg" width={100} height={100} />
                <div className="cardTitle">Recently Activity</div>
                <p>
                  Show individual people that
                  <br /> recently signed up
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="4" sm="12">
          <Card className="cardChange hi-1">
            <CardBody className="p-0">
              <div className="firstCard">
                <img src={count} alt="CountPulse" width={100} height={100} />
                <div className="cardTitle">Live visitors count</div>
                <p>
                  Show how many people are <br /> currently pn your page
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="4" sm="12">
          <Card className="cardChange hi-1">
            <CardBody className="p-0">
              <div className="firstCard">
                <img src={fire} alt="fire" width={100} height={100} />
                <div className="cardTitle">HOT STEAKS</div>
                <p>
                  Show the total visitors or <br /> signups over a period of time
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        {/* <h1 className="text-center">
              Make any optional customizations to your campaign below.
            </h1> */}
        <Col lg="6" md="6" sm="12">
          <Card className="cardChange hi-1">
            <CardHeader className="notifiCard">
              <CardTitle className="cardttl">Appearance</CardTitle>
            </CardHeader>
            <CardBody className="">
              <div className="innerAppearance">
                <div>Hide notifications on mobile</div>
                <div className="d-flex switches">
                  <div>{/* <span>{hide != 'true' ? 'ON' : 'OFF'}</span> */}</div>

                  <FormGroup switch>
                    <Input
                      type="switch"
                      id="1"
                      checked={hide}
                      onClick={() => {
                        setHide(!hide);
                      }}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="innerAppearance">
                <div>Show on top of page on mobile</div>
                <div className="d-flex">
                  <div>{/* <span>OFF</span> */}</div>

                  <FormGroup switch>
                    <Input
                      type="switch"
                      id="2"
                      checked={show}
                      onClick={() => {
                        setShow(!show);
                      }}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="innerAppearance">
                <div>Position notifications on</div>
                <div className="d-flex">
                  <div>{/* <span>OFF</span> */}</div>

                  <FormGroup switch>
                    <Input
                      className=""
                      type="switch"
                      id="3"
                      checked={position}
                      onClick={() => {
                        setPosition(!position);
                      }}
                    />
                  </FormGroup>
                </div>
              </div>
              {/* <div className="innerAppearance">
                    <div>Notification Theme</div>
                    <div className="d-flex">
                      <Select
                        className="React customselect"
                        name="category"
                        options={category}
                      />
                    </div>
                  </div> */}
              <div className="innerAppearance" style={{ border: 'none', marginTop: '11px' }}>
                <div>Notification Theme</div>
                <div className="">
                  <Input
                    // onChange={handleStaus}
                    // defaultValue={statusValue}
                    type="select"
                    name="status"
                    className="form select"
                    id="status"
                  >
                    <option value={'Rounded'}>Rounded</option>
                    <option value={'Boxy'}>Boxy</option>
                  </Input>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="6" sm="12">
          <Card className="cardChange hi-1">
            <CardHeader className="notifiCard">
              <CardTitle className="cardttl"> Timing</CardTitle>
            </CardHeader>
            <CardBody className="">
              <div className="d-flex my-1 align-items-baseline">
                <div className="mr-1"> Delay the first notification for</div>
                <div className="InputDiv">
                  <span className="setInput">
                    <Input type="number" placeholder="0" className="inputTime" />
                  </span>
                </div>
                <span className="ml-1"> seconds</span>
              </div>
              <div className="d-flex my-1 align-items-baseline">
                <div className="mr-1">Display each notification for</div>
                <div className="InputDiv">
                  <span className="">
                    <Input type="number" placeholder="7" className="inputTime" />
                  </span>
                </div>
                <span className="ml-1"> seconds</span>
              </div>
              <div className="d-flex my-1 align-items-baseline">
                <div className="mr-1">Position notifications on</div>
                <div className="InputDiv">
                  <span className="">
                    <Input type="number" placeholder="3" className="inputTime" />
                  </span>
                </div>
                <span className="ml-1"> seconds apart</span>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Notification;
