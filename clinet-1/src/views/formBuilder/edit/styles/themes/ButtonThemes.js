import React, { useState } from 'react';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';

export default function ButtonThemes({ getSelectedHtmlElement }) {
  const [active, setActive] = useState('1');
  const handleNavClicked = (tab) => {
    const element = getSelectedHtmlElement();
    element.addClass(tab);
    setActive(tab);
  };
  return (
    <>
    {/* <div className="blueButton">neraj</div> */}
      <div className="w-100">
        <Nav tabs vertical className="w-100">
          <NavItem>
            <NavLink
              className="pillButton justify-content-start border-bottom "
              active={active === 'pillButton'}
              onClick={() => handleNavClicked('pillButton')}
            >
              <div className="w-100 p-1 rounded hover text-center pillButton">Pill Button</div>
              {/* <Button  className="w-100" onClick={(e)=>e.preventDefault()}></Button> */}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'flatButton'}
              onClick={() => handleNavClicked('flatButton')}
            >
              <div className="w-100 p-1 rounded hover text-center  flatButton">Flat Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'blueButton'}
              onClick={() => handleNavClicked('blueButton')}
            >
              <div className="w-100 p-1 rounded hover text-center blueButton">Blue Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'lightGreenButton'}
              onClick={() => handleNavClicked('lightGreenButton')}
            >
              <div className="w-100 p-1 rounded hover  text-center lightGreenButton">Light Green Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'greenButton'}
              onClick={() => handleNavClicked('greenButton')}
            >
              <div className="w-100 p-1 rounded hover text-white text-center greenButton">Green Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'orangeButton'}
              onClick={() => handleNavClicked('orangeButton')}
            >
              <div className="w-100 p-1 rounded hover  text-center orangeButton" >Orange Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'orangeDarkButton'}
              onClick={() => handleNavClicked('orangeDarkButton')}>
              <div className="w-100 p-1 rounded hover text-center orangeDarkButton" >Orange Dark Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'lightRedButton'}
              onClick={() => handleNavClicked('lightRedButton')}
            >
              <div className="w-100 p-1 rounded hover text-center lightRedButton">Light Red Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'lightButton'}
              onClick={() => handleNavClicked('lightButton')}
            >
              <div className="w-100 p-1 rounded hover text-center lightblueButton">Light Blue Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'lightGreyButton'}
              onClick={() => handleNavClicked('lightGreyButton')}
            >
              <div className="w-100 p-1 rounded hover text-center lightGreyButton">Light Grey Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'blackButton'}
              onClick={() => handleNavClicked('blackButton')}
            >
              <div className="w-100 p-1 rounded hover text-center blackButton
              ">Black Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'blue3dButton'}
              onClick={() => handleNavClicked('blue3dButton')}
            >
              <div className="w-100 p-1 text-center hover blue3dButton">Blue 3D Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'lightGreen3dButton'}
              onClick={() => handleNavClicked('lightGreen3dButton')}
            >
              <div className="w-100 p-1 text-center hover lightGreen3dButton">Light Green 3D Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'green3dButton'}
              onClick={() => handleNavClicked('green3dButton')}
            >
              <div className="w-100 p-1 text-center hover green3dButton">Green 3D Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'orange3dButton'}
              onClick={() => handleNavClicked('orange3dButton')}
            >
              <div className="w-100 p-1 text-center hover orange3dButton">Orange 3D Button</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start border-bottom"
              active={active === 'darkOrange3dButton'}
              onClick={() => handleNavClicked('darkOrange3dButton')}
            >
              <div className="w-100 p-1 text-center hover darkOrange3dButton">Dark Orange 3D Button</div>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </>
  );
}
