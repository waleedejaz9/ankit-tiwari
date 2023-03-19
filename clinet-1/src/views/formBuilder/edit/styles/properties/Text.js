import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';


export default function Text({ getSelectedHtmlElement }) {

  const handleInput = (e) => {
    getSelectedHtmlElement().components(e.target.value);

  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
        <Label>Text</Label>
      </Col>
      <Col xl="6">
        <Input type='textarea' name="value"  onChange={handleInput}  />
      </Col>
    </div>
  );
}
