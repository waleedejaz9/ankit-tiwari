/* eslint-disable no-unused-vars */
import { ArrowLeft, ArrowRight, Linkedin, PlusCircle, Sun, Twitter, User } from 'react-feather';
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
// import AddEmpolye from './AddEmpolye';
import Wizard from '@components/wizard';
import FacebookLogin from 'react-facebook-login';
import { InstagramLogin } from '@amraneze/react-instagram-login';
import TwitterLogin from 'react-twitter-login';

//icons
import { HiOutlineUsers } from 'react-icons/hi';
import { Row, Col, Card, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { SiTiktok } from 'react-icons/si';
import { BsFlag, BsYoutube } from 'react-icons/bs';
import { AiOutlineCloseCircle, AiOutlineHome } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const days = [
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
  '10pm',
  '11pm',
  '12am',
  '1am'
];

const WorkspaceSocial = ({ workspacename, timezone, setIsVisible, isVisible }) => {
  const name = workspacename;
  const time = timezone;

  const [modal, setModal] = useState(false);
  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [modalLinkdin, setModalLinkdin] = useState(false);
  const [modalInstagram, setModalInstagram] = useState(false);
  const [modalYoutube, setModalYoutube] = useState(false);
  const [modalTiktok, setModalTiktok] = useState(false);

  const history = useHistory();

  const toggle = () => setModal(!modal);
  const toggleOne = () => setModalOne(!modalOne);
  const toggleTwo = () => setModalTwo(!modalTwo);
  const toggleLinkdin = () => setModalLinkdin(!modalLinkdin);
  const toggleInstagram = () => setModalInstagram(!modalInstagram);
  const toggleYoutube = () => setModalYoutube(!modalYoutube);
  const toggleTiktok = () => setModalTiktok(!modalTiktok);

  const closeBtn = (
    <Button onClick={toggle} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );
  const closeBtnOne = (
    <Button onClick={toggleOne} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const closeBtnTwo = (
    <Button onClick={toggleTwo} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const closeBtnLinkdin = (
    <Button onClick={toggleLinkdin} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const closeBtnInstagram = (
    <Button onClick={toggleInstagram} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const closeBtnYoutube = (
    <Button onClick={toggleYoutube} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const closeBtnTiktok = (
    <Button onClick={toggleTiktok} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const handleClick = (e) => {
    e.preventDefault();
    console.log(name, time);
    axios
      .post(`http://15.207.21.243:3000/user/createWorkSpace`, {
        workspacename: name,
        timezone: time
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message == 'success') {
          toast.success('Created succesfully');
          history.push('/mysocial/socialconnect');
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleSuccess = (response) => {
    console.log('sssssss', response);
  };

  const handleError = (error) => {
    console.log(error);
  };
  const responseFacebook = (response) => {
    console.log('aaaaaaaaa', response);
    console.log(response.accessToken);
    axios
      .get(`http://localhost:3000/facebook/get-pages/${response.accessToken}`)
      .then(
        (response) => console.log(response)
        // response.json()
      )
      .then((result) => {
        //  if (result && result?.data?.length) {
        //    //Iterate over pages..
        //    let pages = '';
        //    document.getElementById('fbPages').innerHTML = '';
        //    for (let i = 0; i < result.data.length; i++) {
        //      if (result.data[i].name === 'Testing') {
        //        localStorage.setItem('pgToken', result.data[i].access_token);
        //        localStorage.setItem('pageId', result.data[i].id);
        //      }
        //      pages += `<p>${result.data[i].id} - ${result.data[i].name}</p>`;
        //    }
        //    document.getElementById('fbPages').innerHTML = pages;
        //  }
      })
      .catch(() => console.log('error while fetching pages'));
    localStorage.setItem('accessToken', response.accessToken);
  };
  const componentClicked = (data) => {
    console.log(data);
  };

  const responseInstagram = (response) => {
    console.log(response);
  };

  const authHandler = (err, data) => {
    console.log(err, data);
  };

  const url =
    'https://www.facebook.com/v16.0/dialog/oauth?client_id=924703722108276&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fmysocial%2Fworkspacesocial';

  return (
    <>
      <div className="w-100 shadow p-3 mb-5 bg-white rounded  ">
        <div className="p-2" style={{ textAlign: 'center' }}>
          <h1> {name} Connect With Social Profile</h1>
        </div>
        <Row>
          <Col md="3">
            <Card className="py-3 mb-2">
              <div
                className="d-flex justify-content-center align-items-center h-100 w-100"
                onClick={toggle}
              >
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <FaFacebook size={40} color="blue" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Facebook</CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Page or Group
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleOne}>
              <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <FcGoogle size={40} color="blue" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Google </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleTwo}>
              {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}
              <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <Twitter size={40} color="#00acee" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Twitter </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleLinkdin}>
              <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <Linkedin size={40} color="#0A66C2" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Linkedin </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleInstagram}>
              <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <BsInstagram size={40} color="#E1306C" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Instagram </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleYoutube}>
              <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <BsYoutube size={40} color="#c4302b" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Youtube </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleTiktok}>
              <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <SiTiktok size={40} color="#EE1D52" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Tiktok </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-end  mt-3 p-4">
          {/* <Button color="primary" className="btn-prev" onClick={() => setIsVisible(!isVisible)}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button> */}
          <Button color="primary" className="btn-next  " onClick={handleClick}>
            <span className="align-end d-sm-inline-block d-none">Submit</span>
            {/* <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight> */}
          </Button>
        </div>

        {/* modal for facebook */}
        <Modal
          isOpen={modal}
          toggle={toggle}
          fullscreen="xl"
          size="lg"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggle} close={closeBtn}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <FaFacebook size={45} color="blue" />
              </div>
              <div className="p-1">
                <h3>Connect pages</h3>
                <p>Select what type of pages you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <BsFlag size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <FacebookLogin
                          returnScopes="true"
                          appId="935743774437924"
                          autoLoad={false}
                          scope="public_profile,email,user_friends"
                          fields="name,email,picture"
                          onClick={componentClicked}
                          callback={responseFacebook}
                        />

                        {/* <CardTitle tag="h5">Add Facebook</CardTitle> */}
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Pages
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div
                    className="d-flex justify-content-center align-items-center h-100 w-100"
                    onClick={toggle}
                  >
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <HiOutlineUsers size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <CardTitle tag="h5">Add Facebook</CardTitle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Groups
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {/* <a color="primary" href={url}> */}
            Connect Pages
            {/* </a> */}
            {/* <FacebookProvider appId="310109620967829">
              <LoginButton scope="email" onError={handleErropr} onSuccess={handleSuccess}>
                Connect Paages
              </LoginButton>
            </FacebookProvider> */}
            {/* <FacebookProvider appId="310109620967829"> */}
            {/* <button disabled={isLoading} onClick={handleClick}>
      Login
    </button> */}
            {/* <Button color="secondary" onClick={toggle}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
        {/* modal for facebook */}

        {/* modal for google */}
        <Modal
          isOpen={modalOne}
          toggle={toggleOne}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleOne} close={closeBtnOne}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <FcGoogle size={45} color="blue" />
              </div>
              <div className="p-1">
                <h3>Connect Google</h3>
                <p>Select what type of pages you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <CardTitle tag="h5">Add Google</CardTitle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleOne}>
              Connect Paages
            </Button>{' '}
            {/* <Button color="secondary" onClick={toggle}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
        {/* modal for google close */}

        {/* modal for twitter */}
        <Modal
          isOpen={modalTwo}
          toggle={toggleTwo}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleTwo} close={closeBtnTwo}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <Twitter size={40} color="#00acee" />
              </div>
              <div className="p-1">
                <h3>Connect Twitter</h3>
                <p>Select what type of pages you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <TwitterLogin
                          authCallback={authHandler}
                          consumerKey="OJW2dPMR1yUBuosKxMYfwi4pc"
                          consumerSecret="xosmBnv31qBe26OEpc0ePBIPQllfJiOXBDQntDMS1oLT3hTlTf"
                          cssClass=""
                        />
                        <CardTitle tag="h5">Add Twitter</CardTitle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleTwo}>
              Connect Paages
            </Button>{' '}
            {/* <Button color="secondary" onClick={toggle}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
        {/* twitter modal close */}

        {/* modal for linkdin */}
        <Modal
          isOpen={modalLinkdin}
          toggle={toggleLinkdin}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleLinkdin} close={closeBtnLinkdin}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <Linkedin size={40} color="#0A66C2" />
              </div>
              <div className="p-1">
                <h3>Connect Linkedin</h3>
                <p>Select what type of pages you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <CardTitle tag="h5">Add Linkedin</CardTitle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleLinkdin}>
              Connect Paages
            </Button>{' '}
            {/* <Button color="secondary" onClick={toggle}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
        {/* modal for linkdin close */}

        {/* modal for Insta */}
        <Modal
          isOpen={modalInstagram}
          toggle={toggleInstagram}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleInstagram} close={closeBtnInstagram}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <BsInstagram size={40} color="#E1306C" />
              </div>
              <div className="p-1">
                <h3>Connect Instagram</h3>
                <p>Select what type of pages you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <InstagramLogin
                          cssClass="my-facebook-button-class favebook instalogin"
                          clientId="5fd2f11482844c5eba963747a5f34556"
                          buttonText="Login"
                          onSuccess={responseInstagram}
                          onFailure={responseInstagram}
                          redirectUri="REDIRECT_URL"
                        />

                        {/* <CardTitle tag="h5">Add Instagram</CardTitle> */}
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleInstagram}>
              Connect Paages
            </Button>{' '}
            {/* <Button color="secondary" onClick={toggle}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
        {/* modal for Insta Close*/}

        {/* modal for youtube */}
        <Modal
          isOpen={modalYoutube}
          toggle={toggleYoutube}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleYoutube} close={closeBtnYoutube}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <BsYoutube size={40} color="#c4302b" />
              </div>
              <div className="p-1">
                <h3>Connect Youtube</h3>
                <p>Select what type of pages you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <CardTitle tag="h5">Add Youtube</CardTitle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleYoutube}>
              Connect Paages
            </Button>{' '}
            {/* <Button color="secondary" onClick={toggle}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={modalTiktok}
          toggle={toggleTiktok}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleTiktok} close={closeBtnTiktok}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <SiTiktok size={40} color="#EE1D52" />
              </div>
              <div className="p-1">
                <h3>Connect Tiktok</h3>
                <p>Select what type of pages you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <CardTitle tag="h5">Add Youtube</CardTitle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleTiktok}>
              Connect Paages
            </Button>{' '}
            {/* <Button color="secondary" onClick={toggle}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
        {/* modal for tiktalk close */}
      </div>
    </>
  );
};
export default WorkspaceSocial;

const data = [
  {
    id: 1,
    first_name: 'Sancho',
    last_name: 'Vautin',
    email: 'svautin0@yahoo.com',
    gender: 'Male',
    ip_address: '89.254.178.128'
  },
  {
    id: 2,
    first_name: 'Moshe',
    last_name: 'Haggar',
    email: 'mhaggar1@rakuten.co.jp',
    gender: 'Male',
    ip_address: '163.226.116.140'
  },
  {
    id: 3,
    first_name: 'Linus',
    last_name: 'McGiven',
    email: 'lmcgiven2@yahoo.com',
    gender: 'Male',
    ip_address: '43.48.178.43'
  },
  {
    id: 4,
    first_name: 'Sherie',
    last_name: 'Chasson',
    email: 'schasson3@parallels.com',
    gender: 'Female',
    ip_address: '220.61.179.138'
  },
  {
    id: 5,
    first_name: 'Dud',
    last_name: 'Monk',
    email: 'dmonk4@tripadvisor.com',
    gender: 'Male',
    ip_address: '166.52.51.7'
  },
  {
    id: 6,
    first_name: 'Dud',
    last_name: 'Monk',
    email: 'dmonk4@tripadvisor.com',
    gender: 'Male',
    ip_address: '166.52.51.7'
  }
];
