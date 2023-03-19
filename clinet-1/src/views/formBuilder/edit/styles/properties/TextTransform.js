import React from 'react'
import { Input, Label, Col } from 'reactstrap';

export default function TextTransform({ getSelectedHtmlElement }) {
  const handlestyle = (e, name) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ [name]: e.target.value });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Text Transform</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            onChange={(e) => {
              handlestyle(e, 'text-transform');
            }}
          //getPopupContainer={() => document.getElementById('buttoninput')}
          >
            <option value="normal">Normal</option>
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="capitalize">Capitalize</option>
          </Input>
        </Col>
      </div>







    </>
  )
}
