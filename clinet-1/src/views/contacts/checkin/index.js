import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import CheckInCode from './CheckInCode';
import RecentCheckIn from './RecentCheckIn';
import Shift from './Shift';
import ShiftItem from './ShiftItem';

const CheckIn = () => {

  return (
    <>
      <Row className="match-height">
        <Col xxl="3" lg="4" sm="12">
          <Card>
            <CardTitle className='mx-2 mt-2 fw-bolder'>Today's shift</CardTitle>
            <CardBody>
                <Shift />
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" sm="6" className='dark-layout'>
          <Card>
            <CardBody>
                <CheckInCode />
            </CardBody>
          </Card>
        </Col>
        <Col xxl="3" lg="4" sm="6">
          <Card>
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <CardTitle className='mx-2 mt-2 fw-bolder'>Recent Check-ins</CardTitle>
                <Button color="primary" className='mx-2' style={{borderRadius: '50px', fontSize: '12px', padding: '10px'}}>VIEW ALL</Button>
            </div>
            <CardBody>
                <RecentCheckIn />     
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckIn;
