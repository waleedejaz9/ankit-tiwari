import React from 'react';
import { Input, Label,Col } from 'reactstrap';

export default function Borders({ getSelectedHtmlElement }) {
  const handleFontWeightChange = (select) => {
    const element = getSelectedHtmlElement();
    if (!select || !select.options) {
      console.error("Invalid 'select' element passed to handleFontWeightChange.");
      return;
    }
    const fontWeight = select.options[select.selectedIndex].value;
    element.addStyle({ border: fontWeight });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Borders</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input type="select" onChange={(event) => handleFontWeightChange(event.target)}>
            <option value="inherit">inherit</option>
            <option value="none">none</option>
            <option value="1px solid">1px</option>
            <option value="2px solid">2px</option>
            <option value="3px solid">3px</option>
            <option value="4px solid">4px</option>
            <option value="5px solid">5px</option>
            <option value="10px solid">10px</option>
          </Input>
        </Col>
      </div>






    </>
  );
}
