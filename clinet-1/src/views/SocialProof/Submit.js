// React Imports
import { React, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
// Custom Components
import Wizard from "@components/wizard";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneEdit } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { FiMoreHorizontal } from "react-icons/fi";
import Select from "react-select";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import { Button, Col, Container, Row } from "reactstrap";
import { ChevronRight } from "react-feather";
import * as Icon from "react-feather";

const category = [
  { value: "Last 7 days", label: "last 7 days" },
  { value: "Last 30 days", label: "last 30 days" },
  { value: "full test", label: "full test" },
];

const Submit = () => {
  // Ref
  const ref = useRef(null);
  // history
  const history = useHistory();
  // State
  const [stepper, setStepper] = useState(null);

  const store = useSelector((state) => state.formEditor);
  const dispatch = useDispatch();

  // STATES
  const [active, setActive] = useState("1");
  const [selectValue, setSelectValue] = useState("");
  const [position, setPosition] = useState("");
  const [form, setForm] = useState({
    name: "",
    memberType: "Active Member",
    smartList: "",
    subCategory: "",
    formType: "optin",
    formData: [
      {
        id: crypto.randomUUID(),
        step: "1",
        name: "Home",
        path: "home",
        show: true,
        html: "",
        css: "",
      },
    ],
    automateEntry: false,
    status: "create",
  });
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const SubmitHandler = () => {
    alert("Punlish Changes");
  };

  return (
    <>
      <Container>
        <Row>
          <Col md="8">
            <Icon.ChevronLeft
              size={22}
              className=" fonticon-wrap"
              onClick={() => history.push("/mysocial/socialproof")}
            />
          </Col>

          <Col md="4">
            <div className="d-flex justify-content-end">
              <div className="p-1">
                <Button
                  color="primary"
                  style={{
                    backgroundColor: "#f0f1f7",
                    color: "#9196b6",
                  }}
                >
                  <AiTwotoneEdit
                    size={22}
                    onClick={() => stepper.previous()}
                    className="font-medium-1 me-50 fonticon-wrap"
                  />
                </Button>
              </div>

              <div className="p-1">
                <Button
                  onClick={() => stepper.next()}
                  color="primary"
                  style={{
                    backgroundColor: "#f0f1f7",
                    color: "#9196b6",
                  }}
                >
                  <TfiGallery
                    size={22}
                    className="font-medium-1 me-50 fonticon-wrap"
                  />
                </Button>
              </div>
              <div className="p-1">
                <FiMoreHorizontal
                  size={30}
                  className=" fonticon-wrap"
                  color="primary"
                  onClick={() => SubmitHandler()}
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#f0f1f7",
                    // boxShadow: ' none',
                    color: "#9196b6",
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg="7" md="7" sm="12" className="card2">
            <div>Campaign Analytics</div>
          </Col>
          <Col lg="5" md="5" sm="12">
            <div className="d-flex">
              <div className="d-flex ml-2">
                <Label>Time</Label>
                <Select
                  id="task-assignee"
                  className="react-select"
                  classNamePrefix="select"
                  isClearable={false}
                  options={category}
                  onChange={(data) => {
                    setSelectValue(data.value);
                    console.log(data.value);
                  }}
                />
              </div>

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
          </Col>
          <Col md="12" className="my-5">
            <Nav pills className="mb-2 tab-header headerPart borderBothSide">
              <NavItem className="">
                <NavLink
                  className=""
                  active={active === "1"}
                  onClick={() => toggleTab("1")}
                >
                  <div className="zeroOne">
                    <span className="number">0</span>
                  </div>
                  <div className="my-1">
                    <span className="textColor">Goal Completions</span>
                  </div>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className=""
                  active={active === "2"}
                  onClick={() => toggleTab("2")}
                >
                  <div className="zeroOne">
                    <span className="number">0%</span>
                  </div>
                  <div className="my-1">
                    <span className="textColor">Conversion Rate</span>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
                  <div className="zeroOne">
                    <span className="number">0</span>
                  </div>
                  <div className="my-1">
                    <span className="textColor">Visitors</span>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === "4"}>
                  <div className="zeroOne">
                    <span className="number">0</span>
                  </div>
                  <div className="my-1">
                    <span className="textColor">Clicks</span>
                  </div>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Submit;
