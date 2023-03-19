import {
  Button,
  Grid,
  Row,
  Col,
  IconButton,
  Input,
  CardImg,
  Card,
  InputGroup,
  InputGroupText,
  CardBody
} from 'reactstrap';
import { Star, ShoppingCart, Heart } from 'react-feather';
import classnames from 'classnames';

import React, { useState, useEffect } from 'react';
// import person_2 from '../../../../../client/src/assets/img/profile/pages/downloadOne.jpeg';
// client/src/assets/img/profile/pages/downloadOne.jpeg
import person_2 from '../../../../../assets/img/profile/pages/downloadOne.jpeg';
// client/src/assets/img/profile/pages/downloadTwo.jpeg
// import person_1 from '../../../../../client/src/assets/img/profile/pages/downloadTwo.jpeg';
import person_1 from '../../../../../assets/img/profile/pages/downloadTwo.jpeg';
// import MdOutlineAddReaction from '@mui/icons-material/AddReaction';
import { MdOutlineAddReaction } from 'react-icons/md';
// import { Search } from "@material-ui/icons";
import { FcSearch } from 'react-icons/fc';
// import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';
// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { BiCircle } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import GroupNumber from './GroupNumber';
import Filter from './Filter';
import Axios from 'axios';

function AllReviews(props) {
  const { groupNumber, groupId, postData } = props;
  const item = { rating: 3 };
  const xxll = window.innerWidth >= 1664 ? '2' : '12';
  const [pgToken, setPgToken] = useState('');
  const [pid, setPid] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = () => {
    Axios.post(`http://localhost:3000/facebook/comment-on-post`)
      .then((res) => {
        console.log('post data', res);

        // console.log(res.data.data);
        // toast.success('Composed Created Successfully');
        setPgToken('');
        setPid('');
        setMsg('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card className="m-2">
        <GroupNumber groupNumber={groupNumber} />
      </Card>
      <Card className="m-2">
        <Row spacing={2} container>
          <Col item sm={8} md={8} lg={8}>
            <div>
              <>
                <Card className="p-1 w-100 mb-1">
                  <>
                    {postData.length > 0
                      ? postData.map((ele, i) => {
                          return (
                            <div>
                              <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="d-flex align-items-center">
                                  <CardImg
                                    variant="rounded"
                                    src={person_2}
                                    style={{
                                      height: 50,
                                      width: 50
                                    }}
                                  />
                                  <div style={{ marginLeft: '15px' }}>
                                    <h4 className="mb-0">{groupNumber}</h4>
                                    <small className="mt-0">
                                      Left a review on <b>Google</b>
                                    </small>
                                  </div>
                                </div>
                                <div>
                                  <Button
                                    // className="mr-50"
                                    // style={{
                                    //   color: '#6b6b6b',
                                    //   borderRadius: '4px',
                                    //   border: '1px solid #b8c2cc'
                                    // }}
                                    // onClick={props?.handleClose}
                                    outline
                                  >
                                    Share
                                  </Button>
                                </div>
                              </div>

                              <div className="d-flex mt-0">
                                <p>{ele?.message}</p>
                              </div>
                            </div>
                          );
                        })
                      : 'no data found'}
                  </>
                  <div className="">
                    <Row>
                      <Col xxl="1" xs="2">
                        <CardImg
                          variant="rounded"
                          src={person_1}
                          style={{
                            height: 40,
                            width: 40
                          }}
                        />
                      </Col>

                      <Col xxl="9" xs="10">
                        {' '}
                        <Card
                          className=" d-flex align-items-center w-100"
                          style={{
                            backgroundColor: '#eaf4fe',
                            marginLeft: '8px'
                            // marginRight: '14px'
                          }}
                          component="form"
                        >
                          {/* <Input
                    className="ml-1 w-100"
                    placeholder="Reply to Suryasen"
                    // inputProps={{ 'aria-label': 'search google maps' }}
                  /> */}
                          <InputGroup>
                            <Input
                              value={msg}
                              placeholder="Reply....."
                              type="text"
                              onChange={(e) => setMsg(e.target.value)}
                            />
                            <InputGroupText>
                              <MdOutlineAddReaction />
                            </InputGroupText>
                          </InputGroup>
                          {/* <Butto
                    // onClick={() => {
                    //     handleSubmit();
                    // }}
                    className="ml-1"
                    style={{
                      color: '#fff',
                      background: '#0184FF',
                      borderRadius: '4px'
                    }}
                  >
                    Reply
                  </Butto> */}
                          {/* <Divider style={{ height: 18 }} orientation="vertical" flexItem /> */}
                          {/* <Button aria-label="directions">
                    <MdOutlineAddReaction />
                  </Button> */}
                        </Card>
                      </Col>

                      <Col xxl={xxll} xs="12">
                        <Button
                          onClick={() => {
                            handleSubmit(ele.id);
                            console.log('ghghgh', ele.id);
                          }}
                          className="ml-1"
                          color="primary"
                          block
                          // style={{
                          //   color: '#fff',
                          //   background: '#0184FF',
                          //   borderRadius: '4px'
                          // }}
                        >
                          Reply
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Card>
                <hr />
              </>
              {/* );
                  })
                : 'no data found'} */}
            </div>
          </Col>
          <Col item sm={4} md={4} lg={4}>
            <Card>
              <CardBody>
                <div className="reputation-title mb-2 mt-1">
                  <img src={person_2} className="usr-r" />
                  <h3>{groupNumber}</h3>
                  {/* <h3>dfdffdfdfdfdfdfdfdfdfdff d fdfdfdffdf dfdd</h3> */}
                  <p>
                    <span>2.45k likes</span> * <span>2.45k followers</span>
                  </p>
                </div>
              </CardBody>

              <Filter />
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
}
export default AllReviews;

{
  /* <Card className="p-1 w-100 mb-1">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <CardImg
                      variant="rounded"
                      src={person_2}
                      style={{
                        height: 50,
                        width: 50
                      }}
                    />
                    <div style={{ marginLeft: '15px' }}>
                      <h4 className="mb-0">Suryasen</h4>
                      <small className="mt-0">
                        Left a review on <b>Google</b>
                      </small>
                    </div>
                  </div>
                  <div>
                    <Button outline>Share</Button>
                  </div>
                </div>
                <div className="item-rating mt-1">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item me-25">
                          {item.rating <= index ? (
                            <Star
                              className={classnames({
                                'filled-star': index + 1 <= '3',
                                'unfilled-star': index + 1 > '3'
                              })}
                            />
                          ) : (
                            <AiFillStar size={26} style={{ color: '#ff9f43' }} />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="d-flex mt-0">
                  <p>
                    I love the work you do. it is so inspiring to me.I looke forword to collaborate
                    with you guys in future. I love the work you do. it is so inspiring to me.I
                    looke forword to collaborate with you guys in future. I love the work you do. it
                    is so inspiring to me.I looke forword to collaborate with you guys in future.
                  </p>
                </div>
                <div className="">
                  <Row>
                    <Col xl="1">
                      <CardImg
                        variant="rounded"
                        src={person_1}
                        style={{
                          height: 40,
                          width: 40
                        }}
                      />
                    </Col>
                    <Col xl="9">
                      {' '}
                      <Card
                        className=" d-flex align-items-center w-100"
                        style={{
                          backgroundColor: '#eaf4fe'
                        }}
                        component="form"
                      >
                        <InputGroup>
                          <Input placeholder="Reply to Suryasen" />
                          <InputGroupText>
                            <MdOutlineAddReaction />
                          </InputGroupText>
                        </InputGroup>
                      </Card>
                    </Col>
                    <Col xl="2">
                      <Button className="ml-1" color="primary" block>
                        Reply
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
              <hr /> */
}

{
  /* <Card className="p-1 w-100 mb-1">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <CardImg
                      variant="rounded"
                      src={person_2}
                      style={{
                        height: 50,
                        width: 50
                      }}
                    />
                    <div style={{ marginLeft: '15px' }}>
                      <h4 className="mb-0">Suryasen</h4>
                      <small className="mt-0">
                        Left a review on <b>Google</b>
                      </small>
                    </div>
                  </div>
                  <div>
                    <Button outline>Share</Button>
                  </div>
                </div>
                <div className="item-rating mt-1">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item me-25">
                          {item.rating <= index ? (
                            <Star
                              className={classnames({
                                'filled-star': index + 1 <= '3',
                                'unfilled-star': index + 1 > '3'
                              })}
                            />
                          ) : (
                            <AiFillStar size={26} style={{ color: '#ff9f43' }} />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="d-flex mt-0">
                  <p>
                    I love the work you do. it is so inspiring to me.I looke forword to collaborate
                    with you guys in future. I love the work you do. it is so inspiring to me.I
                    looke forword to collaborate with you guys in future. I love the work you do. it
                    is so inspiring to me.I looke forword to collaborate with you guys in future.
                  </p>
                </div>
                <div className="">
                  <Row>
                    <Col xl="1">
                      <CardImg
                        variant="rounded"
                        src={person_1}
                        style={{
                          height: 40,
                          width: 40
                        }}
                      />
                    </Col>
                    <Col xl="9">
                      {' '}
                      <Card
                        className=" d-flex align-items-center w-100"
                        style={{
                          backgroundColor: '#eaf4fe'
                        }}
                        component="form"
                      >
                        <InputGroup>
                          <Input placeholder="Reply to Suryasen" />
                          <InputGroupText>
                            <MdOutlineAddReaction />
                          </InputGroupText>
                        </InputGroup>
                      </Card>
                    </Col>

                    <Col xl="2">
                      <Button className="ml-1" color="primary" block>
                        Reply
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card> */
}
