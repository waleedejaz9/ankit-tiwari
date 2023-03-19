import React, { Fragment, useState, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Profile from '../../../../assets/images/profile/post-media/2.jpg';
import banner1 from '../../../../assets/images/banner/banner-2.jpg';
import Post1 from '../../../../assets/images/banner/banner-39.jpg';
import Post2 from '../../../../assets/images/banner/banner-34.jpg';
import Post3 from '../../../../assets/images/banner/banner-34.jpg';
import Post4 from '../../../../assets/images/banner/banner-33.jpg';
import Post5 from '../../../../assets/images/banner/banner-32.jpg';
import Post6 from '../../../../assets/images/banner/banner-35.jpg';
import Post7 from '../../../../assets/images/banner/banner-36.jpg';
import Post8 from '../../../../assets/images/banner/banner-31.jpg';
import { AiFillDelete } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import axios from 'axios';
import Moment from 'react-moment';

// import Post9 from "../../../../assets/images/banner/banner-30.jpg"

const FeedView = (workspaceid) => {
  const workspacedata = workspaceid;
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [comment, setcomment] = useState([]);
  const [Postcoment, setPostcoment] = useState();
  const [Id, setid] = useState('');

  const handlePost = (e, id) => {
    e.preventDefault();

    axios
      .post('http://15.207.21.243:3000/user/add_comment', {
        post: id,
        userid: '63e3a492f49ead238773ef08',
        comment: text
      })
      .then((resp) => {
        setPostcoment(resp.data.data);
        getOneComment(Id, index);
        setText('');
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const handleDeletePost = (id) => {
    console.log(id);
    axios
      .get(`http://15.207.21.243:3000/user/del_compose/${id}`)
      .then((res) => {
        getCompose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (id) => {
    axios
      .get(`http://15.207.21.243:3000/user/del_comment/${id}`)
      .then((res) => {
        getOneComment(Id, index);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [index, setindex] = useState('');

  const getOneComment = (id, i) => {
    setid(id);
    setindex(i);

    axios
      .get(`http://15.207.21.243:3000/user/comment_by_post/${id}`)
      .then((resp) => {
        setcomment(resp.data.data);
        handlePost(e, Id);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const getCompose = () => {
    axios
      .get('http://15.207.21.243:3000/user/get_compose')
      .then((resp) => {
        setData(resp.data.data);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };
  useEffect(() => {
    getCompose();
  }, []);
  return (
    <Fragment>
      <div className="">
        <Row>
          <Col sm={3} md={3} lg={3} className="text-center">
            <Card>
              <CardBody>
                <img
                  className="mb-1"
                  alt="profile"
                  src={Profile}
                  style={{
                    border: '1px solid',
                    borderRadius: '50%',
                    width: '200px',
                    height: '200px'
                  }}
                />
                <span>charleen_001</span>
                <h4>Charleen Martin</h4>
              </CardBody>
            </Card>
          </Col>
          <Col sm={9} md={9} lg={9}>
            <Card>
              <CardBody>
                <div>
                  <img alt="banner" src={banner1} style={{ height: '200px', width: '100%' }} />
                </div>
              </CardBody>
            </Card>
            <Row>
              {data?.map((value, i) => (
                <>
                  <Col sm={7} md={7} lg={7} className="mt-1">
                    <div className="post-main" key={value.id}>
                      <Card>
                        <CardBody>
                          <div className="post-box">
                            <div className="d-flex justify-content-end deletecoment">
                              <span className="mr-3">
                                <BsFacebook fill="blue" size="22px" />
                              </span>
                              <span className=" mr-3 ml-2">
                                <AiFillDelete
                                  onClick={() => handleDeletePost(value?._id)}
                                  fill="red"
                                  size="20px"
                                />
                              </span>
                            </div>
                            <div className="post-header">
                              <div className="d-flex">
                                <img
                                  className="mb-1"
                                  alt="profile"
                                  src={value?.media_img[0]}
                                  style={{
                                    border: '1px solid',
                                    borderRadius: '100%',
                                    width: '50px',
                                    height: '50px'
                                  }}
                                />
                                <h5 className="ml-2">
                                  Lorem ipsum
                                  <p className="font-s">
                                    <Moment format="DD/MM/YYYY">{value?.createdAt}</Moment>
                                  </p>
                                </h5>
                              </div>

                              <p>{value?.desc}</p>
                            </div>
                            <div className="post-content">
                              <img
                                className="mb-1"
                                alt=""
                                src={value?.media_img[0]}
                                style={{
                                  width: '100%'
                                }}
                              />
                              <div className=" comments">
                                <a
                                  onClick={() => getOneComment(value?._id, i)}
                                  className="commenttext"
                                >
                                  Comments
                                </a>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </Col>
                  {comment !== '' && index == i ? (
                    <>
                      <Col key={value?._id} sm={5} md={5} lg={5} className="mt-1">
                        <div>
                          <Card>
                            <CardBody>
                              <div className="comment-box ">
                                <div className="comt-list">
                                  <ul>
                                    {comment.map((data) => (
                                      <li key={data?._id}>
                                        <div className=" d-flex justify-content-end deletecoment">
                                          <div className="deletecoment">
                                            <AiFillDelete
                                              onClick={() => handleDelete(data?._id)}
                                              fill="red"
                                              size="15px"
                                            />
                                          </div>
                                        </div>
                                        <div className="d-flex">
                                          <img
                                            className="mb-1"
                                            alt="profile"
                                            src={Profile}
                                            style={{
                                              border: '1px solid',
                                              borderRadius: '50%',
                                              width: '30px',
                                              height: '30px'
                                            }}
                                          />

                                          <h5 className="mr-1">You</h5>

                                          <p className="ml-3" style={{ fontSize: 12 }}>
                                            {/* {data?.comment} */}
                                          </p>
                                        </div>
                                        <div className="commet-msg">{data?.comment}</div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="comt-form">
                                  <h6>Comment:</h6>
                                  <form>
                                    <textarea
                                      value={text}
                                      onChange={(e) => setText(e.target.value)}
                                      className="form-control"
                                      placeholder="Comment...."
                                    ></textarea>
                                    <button
                                      onClick={(e) => handlePost(e, value?._id)}
                                      className="btn btn-primary mt-2 mr-2"
                                    >
                                      Post
                                    </button>
                                    <button className="btn btn-danger mt-2">Cancel</button>
                                  </form>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                    </>
                  ) : null}
                </>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};
export default FeedView;
