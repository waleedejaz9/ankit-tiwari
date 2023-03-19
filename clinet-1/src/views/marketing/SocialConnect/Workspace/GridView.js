import React, { Fragment } from 'react';
import { CheckCircle, Clock } from 'react-feather';
import { Card, CardHeader, Col, Row } from 'reactstrap';
import Post4 from '../../../../assets/images/banner/banner-33.jpg';

const GridView = () => {
  return (
    <Fragment>
      <Row>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div className="">
              <div className="gd-view">
                <img src={Post4} alt="post4" width="100%" />
              </div>
              <div className="grid-icon">
                <CheckCircle className="me-1" />
                <Clock />
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div className="">
              <div className="gd-view">
                <img src={Post4} alt="post4" width="100%" />
              </div>
              <div className="grid-icon">
                <CheckCircle className="me-1" />
                <Clock />
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div className="">
              <div className="gd-view">
                <img src={Post4} alt="post4" width="100%" />
              </div>
              <div className="grid-icon">
                <CheckCircle className="me-1" />
                <Clock />
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div className="">
              <div className="gd-view">
                <img src={Post4} alt="post4" width="100%" />
              </div>
              <div className="grid-icon">
                <CheckCircle className="me-1" />
                <Clock />
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div className="">
              <div className="gd-view">
                <img src={Post4} alt="post4" width="100%" />
              </div>
              <div className="grid-icon">
                <CheckCircle className="me-1" />
                <Clock />
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div className="">
              <div className="gd-view">
                <img src={Post4} alt="post4" width="100%" />
              </div>
              <div className="grid-icon">
                <CheckCircle className="me-1" />
                <Clock />
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div className="">
              <div className="gd-view">
                <img src={Post4} alt="post4" width="100%" />
              </div>
              <div className="grid-icon">
                <CheckCircle className="me-1" />
                <Clock />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default GridView;
