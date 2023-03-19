import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function FontSize({ getSelectedHtmlElement }) {
  const [fontSize, setFontSize] = useState(16);
  const minFontSize = 8;
  const maxFontSize = 72;

  const handleFontsize = (e) => {
    let newFontSize = e.target.value;
    if (newFontSize < minFontSize) {
      newFontSize = minFontSize;
    } else if (newFontSize > maxFontSize) {
      newFontSize = maxFontSize;
    }
    const element = getSelectedHtmlElement();
    element.addStyle({ 'font-size': newFontSize + 'px' });
    setFontSize(newFontSize);
  };

  const handleInput = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'font-size': e.target.value + 'px' });
    setFontSize(e.target.value);
  };

  return (
    <>

      <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
          <Label>Font Size</Label>
        </Col>
        <Col xl="4" >
          <Input type="range" min={minFontSize} max={maxFontSize} value={fontSize} onChange={handleFontsize} />
        </Col>
        <Col xl="1" xs="1">
          <Input className="countinput p-0" value={fontSize} onChange={handleInput} />
        </Col>
      </div>


    </>
  );
}
