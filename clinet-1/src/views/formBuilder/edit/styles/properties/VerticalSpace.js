import React from 'react'
import { Input, Label,Col } from 'reactstrap';

const spaces = [
  'inherit',
  '5px',
  '10px',
  '15px',
  '20px',
  '25px',
  '30px',
  '35px',
  '40px',
  '0px'
];

export default function VerticalSpace({ getSelectedHtmlElement }) {
  const handlestyle = (e, name) => {
    const padding = `0px ${e.target.value} 0px ${e.target.value} `
    const element = getSelectedHtmlElement();
    element.addStyle({ [name]: padding });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Vertical Space</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            //getPopupContainer={() => document.getElementById('buttoninput')}
            onChange={(e) => handlestyle(e, 'padding')}
          >
            {spaces.map((item) => {
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
