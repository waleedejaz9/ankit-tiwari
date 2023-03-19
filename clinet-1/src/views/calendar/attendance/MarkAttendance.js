// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Button, Label, CardHeader, CardTitle } from 'reactstrap';
import AsyncSelect from 'react-select/async';
//** third party imports */
import Flatpickr from 'react-flatpickr';
// ** Custom Components

// ** Utils
import { selectThemeColors } from '@utils';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

// ** Events Actions Import
import AttendanceList from './AttendanceList';
import { markAttendance, getAttendance } from './store';

import { getUserData } from '../../../auth/utils';

const MarkAttendance = (props) => {
  //** props */
  const { contacts } = props;

  const colorOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isFixed: true },
    { value: 'purple', label: 'Purple', color: '#5243AA', isFixed: true },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: false },
    { value: 'orange', label: 'Orange', color: '#FF8B00', isFixed: false },
    { value: 'yellow', label: 'Yellow', color: '#FFC400', isFixed: false }
  ];
  // ** Store  vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.attendance);

  const selectedClass = store?.selectedClass;
  //const store = useSelector((state) => state.event)
  const [markDate, setMarkDate] = useState(new Date());
  const [contact, setContact] = useState({});
  // ** States

  useEffect(() => {
    if (selectedClass?._id !== undefined && selectedClass?._id !== '') {
      dispatch(getAttendance(selectedClass?._id));
    }
  }, []);

  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterContacts(inputValue));
      }, 200);
    });
  };

  const filterContacts = (inputValue) => {
    const filterData = contacts?.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    return filterData;
  };

  const handleInputChange = (newValue) => {
    const val = newValue.replace(/\W/g, '');
    return val;
  };

  const handleContactChange = (contact) => {
    setContact(contact);
  };

  const handleSubmit = () => {
    const payloadData = {
      image: contact?.photo,
      contactId: contact?._id,
      fullName: contact?.fullName,
      email: contact?.email,
      dateTime: markDate,
      classId: selectedClass?._id,
      className: selectedClass?.classTitle,
      userId: getUserData().id
    };

    dispatch(markAttendance(payloadData));
  };

  return (
    <Fragment>
      <Row>
        <Col md="12" sm="12">
          <Row>
            <Col>
              <Card>
                {selectedClass.classTitle && (
                  <CardHeader className='border-bottom py-1'>
                    <CardTitle>{selectedClass.classTitle}</CardTitle>
                  </CardHeader>
                )}
                <CardBody>
                  <div className="d-flex justify-content-around pt-2 gap-1">
                    <div className="mb-1 width-65-per">
                      <Label className="form-label" for="studentId">
                        Search Contact
                      </Label>
                      <AsyncSelect
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        loadOptions={promiseOptions}
                        onChange={handleContactChange}
                        onInputChange={handleInputChange}
                        theme={selectThemeColors}
                        cacheOptions
                        defaultOptions={contacts}
                        placeholder="Type name here"
                      />
                    </div>

                    <div className="mb-1 width-35-per">
                      <Label className="form-label" for="markDate">
                        Date & Time
                      </Label>
                      <Flatpickr
                        required
                        id="markDate"
                        name="markDate"
                        className="form-control"
                        onChange={(date) => setMarkDate(date[0])}
                        value={markDate}
                        options={{
                          enableTime: true,
                          dateFormat: 'm/d/Y G:i K'
                        }}
                      />
                    </div>
                      </div>
                    <div className="d-flex mt-1 justify-content-center">
                      <Button onClick={() => handleSubmit()} color="primary">
                        Mark
                      </Button>
                    </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {<AttendanceList classId={selectedClass?._id} />}
        </Col>
      </Row>
    </Fragment>
  );
};
export default MarkAttendance;
