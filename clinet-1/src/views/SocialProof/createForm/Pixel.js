import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  CustomInput,
  CardHeader,
  CardTitle,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Input
} from 'reactstrap';
import { MoreHorizontal, ChevronDown } from 'react-feather';
// clipboard
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// clipboard

const Pixel = () => {
  const [value, setValue] = useState('Copy Me!');
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    console.log('clicked', e.target.value);
    setValue(e.target.value);
  };

  const onCopy = () => {
    setCopied(true);
    toast.success('Text Copied Successfully', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };
  return (
    <>
      <div className="heading">
        <h1>Install My Pixel </h1>
        <p className="">Follow the instructions below or ask a colleague to help.</p>
      </div>
      <div className="bottom-box">
        <Card className="">
          <CardBody>
            <Row>
              <Col lg="12" sm="12">
                <h2 className="heading2">1. Add this code to your site header</h2>
              </Col>
            </Row>
            <div className="addCode">
              <p>
                Add the code to all pages of your website in the section.
                <a href="#"> Learn more.</a>
              </p>
            </div>
            <Row>
              <Col lg="12" md="12" sm="12" className="pr-md-0 mb-1">
                <Input value={value} onChange={handleCopy} />
              </Col>
              <Col md="2" sm="12" className="">
                <CopyToClipboard onCopy={onCopy} text={value}>
                  <Button.Ripple color="primary">Copy Code</Button.Ripple>
                </CopyToClipboard>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
      <Row>
        <Col lg="12" md="12" sm="12" className="card2">
          <Card className="">
            <CardBody>
              <Row>
                <Col lg="12" sm="12">
                  <h2 className="heading2">2. Wait for data from your site</h2>
                </Col>
              </Row>
              <div className="addCode">
                <p>A status message will appear below when your pixel code has been detected.</p>
              </div>
              <div className="msgDiv">
                <span>Your pixel is not yet sending data</span>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Pixel;
