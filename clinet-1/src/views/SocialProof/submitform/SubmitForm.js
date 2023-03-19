// React Imports
import { React, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// Custom Components
import Wizard from '@components/wizard';
import Pixel from './createForm/Pixel';
import SetGoal from './createForm/SetGoal';
import Notification from './createForm/Notification';
import DisplaySite from './createForm/DisplaySite';
import { useDispatch, useSelector } from 'react-redux';

import Stepper from 'bs-stepper';
import { Button, Col, Container, Row } from 'reactstrap';
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import * as Icon from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
const SubmitForm = () => {
  // Ref
  const ref = useRef(null);
  // history
  const history = useHistory();
  // State
  const [stepper, setStepper] = useState(null);

  const store = useSelector((state) => state.formEditor);
  const dispatch = useDispatch();

  // STATES
  const [form, setForm] = useState({
    name: '',
    memberType: 'Active Member',
    smartList: '',
    subCategory: '',
    formType: 'optin',
    formData: [
      {
        id: crypto.randomUUID(),
        step: '1',
        name: 'Home',
        path: 'home',
        show: true,
        html: '',
        css: ''
      }
    ],
    automateEntry: false,
    status: 'create'
  });

  const steps = [
    {
      id: 'info',
      title: 'Pixel',
      subtitle: 'Confirm and Install',
      content: <Pixel stepper={stepper} type="wizard-modern" form={form} setForm={setForm} />
    },
    {
      id: 'template',
      title: 'Goal',
      subtitle: 'Create and Set',
      content: (
        <SetGoal
          stepper={stepper}
          type="wizard-modern"
          form={form}
          setForm={setForm}
          store={store}
          dispatch={dispatch}
        />
      )
    },
    {
      id: 'notification',
      title: 'Notification',
      subtitle: '',
      content: (
        <Notification
          stepper={stepper}
          type="wizard-modern"
          form={form}
          setForm={setForm}
          store={store}
          dispatch={dispatch}
        />
      )
    },

    {
      id: 'display',
      title: 'Display on-site',
      subtitle: '',
      content: (
        <DisplaySite
          stepper={stepper}
          type="wizard-modern"
          form={form}
          setForm={setForm}
          store={store}
          dispatch={dispatch}
        />
      )
    }
  ];
  const SubmitHandler = () => {
    alert('Punlish Chnages');
  };
  return (
    <>
      <PerfectScrollbar
        className="main-menu-content"
        options={{ wheelPropagation: false }}
        // onScrollY={(container) => scrollMenu(container)}
      >
        <Container>
          <Row>
            <Col md="6">
              <Icon.ChevronLeft
                size={22}
                className=" fonticon-wrap"
                onClick={() => history.push('/mysocial/socialproof')}
              />
            </Col>
            <Col md="6">
              <div className="ft-1">
                <Button size={22} className=" fonticon-wrap" onClick={() => stepper.previous()}>
                  Back
                </Button>
                <Button
                  size={22}
                  className=" fonticon-wrap"
                  color="primary"
                  onClick={() => stepper.next()}
                >
                  Next
                </Button>
                <Button
                  size={22}
                  className=" fonticon-wrap"
                  color="primary"
                  onClick={() => SubmitHandler()}
                >
                  Publish Changes
                </Button>
              </div>
            </Col>
            <Col md="12">
              <div className="modern-horizontal-wizard">
                <Wizard
                  type="modern-horizontal"
                  ref={ref}
                  steps={steps}
                  options={{
                    linear: false
                  }}
                  instance={(el) => setStepper(el)}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </PerfectScrollbar>
    </>
  );
};

export default SubmitForm;
