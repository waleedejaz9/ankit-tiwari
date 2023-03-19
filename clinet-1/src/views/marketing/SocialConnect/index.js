import React, { Fragment, useState, useEffect } from 'react';
import { ChevronLeft, PlusCircle, Trash } from 'react-feather';
import { Card, CardFooter, Col, Row } from 'reactstrap';
import BreadCrumbs from '@components/breadcrumbs';
import { Link } from 'react-router-dom';
import WorkspaceMain from './Workspace/WorkspaceMain';
import axios from 'axios';
import Moment from 'react-moment';

const SocialConnectMain = () => {
  const [workplace, showWorkplace] = useState(false);
  const [data, setData] = useState([]);
  const [datadelete, setDatadelete] = useState(false);
  const [workspaceid, setworkspaceid] = useState('');
  const [workspceName, setWorkspceName] = useState();

  const handleid = (id) => {
    setworkspaceid(id);
    axios
      .get(`http://15.207.21.243:3000/user/viewone_workspace/${id}`)
      .then((resp) => {
        setWorkspceName(resp.data.data.workspacename);
        // setAllData(resp.data.data);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };

  const handledelete = (id) => {
    axios
      .get(`http://15.207.21.243:3000/user/dlt_workspace/${id}`)
      .then((resp) => {
        if (resp.data.message == 'deleted') {
          setDatadelete(true);
          setDatadelete(false);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };
  useEffect(() => {
    axios
      .get('http://15.207.21.243:3000/user/workSpace_list')
      .then((resp) => {
        console.log(resp.data.data);
        setData(resp.data.data);
        // setDatadelete(false);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }, [datadelete]);

  return !workplace ? (
    <Fragment>
      <div>
        <div className="d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center me-1"
            style={{
              borderRadius: '6px',
              width: '40px',
              height: '40px',
              backgroundColor: '#e52a2a',
              color: '#fff'
            }}
          >
            <span style={{ fontSize: '20px' }}>
              <b>M</b>
            </span>
          </div>
          <span>
            <b>Your Workspace</b>
          </span>
          <br />
        </div>
      </div>
      <div
        className="mt-1"
        style={{ borderTop: '1px solid #b8c2cc', borderBottom: '1px solid #b8c2cc' }}
      >
        <Row className="mt-2">
          <Col sm={3} md={3} lg={3}>
            <Link to="/mysocial/createworkspace">
              <Card className="cursor-pointer" style={{ height: '200px' }}>
                <div className="d-flex justify-content-center align-items-center h-100 w-100">
                  <div>
                    <div className="d-flex justify-content-center mb-1">
                      <PlusCircle size={30} />
                    </div>
                    <div>
                      <span>Create New WorkSpace</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
          {data?.map((value) => (
            <Col sm={3} md={3} lg={3}>
              <div key={value.id}>
                <Card
                  // onClick={() => {
                  //   showWorkplace(true);
                  //   handleid(value?._id);
                  // }}
                  className="cursor-pointer p-1"
                  style={{ height: '200px' }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      onClick={() => {
                        showWorkplace(true);
                        handleid(value?._id);
                      }}
                      className="d-flex justify-content-center align-items-center me-1"
                      style={{
                        borderRadius: '6px',
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#e52a2a',
                        color: '#fff'
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>
                        <b>T</b>
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        showWorkplace(true);
                        handleid(value?._id);
                      }}
                    >
                      <b> {value?.workspacename}</b>
                      <br />
                      <span>5 Pages</span>
                    </div>
                    <div className="delete_work deletespace">
                      <Trash
                        fontSize={10}
                        color="red"
                        onClick={() => {
                          handledelete(value._id);
                        }}
                      />
                    </div>
                  </div>
                  <CardFooter
                    onClick={() => {
                      showWorkplace(true);
                      handleid(value?._id);
                    }}
                  >
                    <Moment format="ll">{value?.createdAt}</Moment>
                  </CardFooter>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Row className="mt-2">
        <Col sm={3} md={3} lg={3}>
          <Card
            onClick={() => {
              showWorkplace(true);
              handleid(value?._id);
            }}
            className="cursor-pointer p-1"
            style={{ height: '200px' }}
          >
            <div className="d-flex align-items-center">
              <div
                className="d-flex justify-content-center align-items-center me-1"
                style={{
                  borderRadius: '6px',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#e52a2a',
                  color: '#fff'
                }}
              >
                <span style={{ fontSize: '20px' }}>
                  <b>S</b>
                </span>
              </div>
              <div>
                <b>Sample</b>
                <br />
                <span>5 Pages</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  ) : (
    <>
      <Col xl="12">
        <div className="card  p-2 rtt-3">
          <ChevronLeft size={45} onClick={() => showWorkplace(!workplace)}></ChevronLeft>
          <span>{workspceName}</span>
        </div>
      </Col>
      <WorkspaceMain workspaceid={workspaceid} />
    </>
  );
};
export default SocialConnectMain;
