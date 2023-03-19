import React from 'react';
import { Input, Label,Col } from 'reactstrap';

export default function Display({ getSelectedHtmlElement }) {
  const handlestyle = (e, name) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ [name]: e.target.value });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Inline/Block</Label>
        </Col>
        <Col xl="6" xs="6">


          <Input
            type="select"
            //getPopupContainer={() => document.getElementById('buttoninput')}
            onChange={(e) => handlestyle(e, 'display')}
          >
            <option value="block">Display Block</option>
            <option value="inline">Display Inline</option>
          </Input>
        </Col>
      </div>





    </>
  );
}
