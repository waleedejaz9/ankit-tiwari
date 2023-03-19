import React from 'react'
import { Input, Label, Col } from 'reactstrap';

const raduces = ['inherit', 'square', '2px', '3px', '4px', '5px', '10px', '15px', '60px', '50%'];

export default function Corners({ getSelectedHtmlElement }) {
  const handlestyle = (e, name) => {
    if (name === 'border-radius') {
      if (e.target.value === 'square') {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: '0' });
      } else {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: e.target.value });
      }
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Corners</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            //getPopupContainer={() => document.getElementById('buttoninput')}
            onChange={(e) => handlestyle(e, 'border-radius')}
          >
            {raduces.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </Input>
        </Col>
      </div>







    </>
  )
}
