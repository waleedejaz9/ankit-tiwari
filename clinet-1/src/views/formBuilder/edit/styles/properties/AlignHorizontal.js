import React from 'react';
import { Input, Label,Col } from 'reactstrap';

export default function AlignHorizontal({ getSelectedHtmlElement }) {
  const handlestyle = (e, name) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ dispaly: 'flex', [name]: e.target.value });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Button Align</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            onChange={(e) => handlestyle(e, 'justify-content')}
            getPopupContainer={() => document.getElementById('buttoninput')}
          >
            <option value="center">Center</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </Input>
        </Col>
      </div>






    </>
  );
}
