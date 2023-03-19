import React from 'react'
import { Input, Label, Col } from 'reactstrap';

export default function TextShadow({ getSelectedHtmlElement }) {
  const handlestyle2 = (e, name) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ [name]: e.target.value });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Text Shadow</Label>
        </Col>
        <Col xl="6">

          <Input
            type="select"
            onChange={(e) => {
              handlestyle2(e, 'text-shadow');
            }}
          //getPopupContainer={() => document.getElementById('buttoninput')}
          >
            <option value="none">No Shadow</option>
            <option value="subtitle">Subtitle Shadow</option>
            <option value="mid">Mid Shadow</option>
            <option value="strong">Strong Shadow</option>
          </Input>
        </Col>
      </div>




    </>
  )
}
