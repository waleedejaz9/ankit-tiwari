import React from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function SubText({ getSelectedHtmlElement }) {
  const handleTextChange = (event) => {
    const element = getSelectedHtmlElement();
    if (element) {
      element.set(element.innerText = event.target.value);
    }
  };
  return (
    <>



      <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
          <Label>Sub Text</Label>
        </Col>
        <Col xl="6">
          <Input defaultValue="Enter sub text here" onChange={handleTextChange} />
        </Col>
      </div>

    </>
  );
}
