import React, { useState } from 'react';
import { ArrowRight, Facebook, Globe, Mail } from 'react-feather';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Input,
  Nav,
  NavItem,
  NavLink,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader
} from 'reactstrap';

export default function AddAction({ getSelectedHtmlElement }) {
  // ** STATES
  const [openAction, setOpenAction] = useState(false);
  const [active, setActive] = useState('1');

  const toggleAction = () => setOpenAction(!openAction);

  const handleSetTarget = (e)=>{
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    //attributes.target = e.target.value;
    attributes ={...attributes,target :e.target.value}
    getSelectedHtmlElement().setAttributes(attributes);
  }
  const handleAddUrl = (e)=>{
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    //attributes.target = e.target.value;
    attributes ={...attributes,url :e.target.value}
    getSelectedHtmlElement().setAttributes(attributes);
  }
  const handleNavClicked = (type) => {
    const element = getSelectedHtmlElement();
        let attributes = element.getAttributes();
    switch (type) {
      case '1':
        
        attributes.selectedOption = 'submit';
        getSelectedHtmlElement().setAttributes(attributes);
        break;
      case '2':
        // facebook optin
        break;
      case '3':
        
        attributes.selectedOption = 'open-website';
        getSelectedHtmlElement().setAttributes(attributes);
        break;
      case '4':
        attributes.selectedOption = 'next-step';
        getSelectedHtmlElement().setAttributes(attributes);
        break;

      default:
        attributes.selectedOption = 'submit';
        getSelectedHtmlElement().setAttributes(attributes);
        break;
    }
    setActive(type);
  };

  return (
    <>
      <Button color="primary" size="sm" className="inputstyle w-100" onClick={toggleAction}>
        SET ACTION
      </Button>
      <Offcanvas scrollable isOpen={openAction} toggle={toggleAction} direction="end">
        <OffcanvasHeader toggle={toggleAction}>Button Actions</OffcanvasHeader>
        <div className="w-100">
          <Nav tabs vertical className="w-100">
            <NavItem>
              <NavLink
                className="justify-content-start border-bottom"
                active={active === '1'}
                onClick={() => handleNavClicked('1')}
              >
                <Mail />
                SUBMIT FORM
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="justify-content-start border-bottom"
                active={active === '2'}
                onClick={() => handleNavClicked('2')}
              >
                <Facebook />
                FACEBOOK OPTIN
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className="justify-content-start border-bottom"
                active={active === '3'}
                onClick={() => handleNavClicked('3')}
              >
                <Globe />
                GO TO WEBSITE URL
              </NavLink>
            </NavItem> */}
            <Accordion open={active} toggle={() => handleNavClicked('3')} className="border-bottom">
              <AccordionItem>
                <AccordionHeader targetId="3">
                  <Globe />
                  <span className='ms-50'>GO TO WEBSITE URL</span>
                </AccordionHeader>
                <AccordionBody accordionId="3">
                  <Input type="url" placeholder="Enter a Website URL" onChange={handleAddUrl} className='my-50'/>
                  <Input type="select" onChange={handleSetTarget}>
                    <option value="same">Open in the same window</option>
                    <option value="_blank">Open in new tab/window</option>
                  </Input>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
            <NavItem>
              <NavLink
                className="justify-content-start border-bottom"
                active={active === '4'}
                onClick={() => handleNavClicked('4')}
              >
                <ArrowRight />
                GO TO NEXT STEP IN FUNNEL
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </Offcanvas>
    </>
  );
}
