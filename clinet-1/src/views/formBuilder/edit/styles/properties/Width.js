import React from 'react'
import { Input, Label, Col } from 'reactstrap'

export default function Width({ getSelectedHtmlElement }) {
  const handlestylewidth = (e, value) => {

    if (e.target.value === 'fill width') {
      const element = getSelectedHtmlElement();
      element.addStyle({ width: '100%' });
    } else {
      const element = getSelectedHtmlElement();
      element.addStyle({ width: '200px' });
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Width</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            //getPopupContainer={() => document.getElementById('buttoninput')}
            onChange={(e) => handlestylewidth(e, 'width')}
          >
            <option value="fuild">Fuild</option>
            <option value="fill width">Fill width</option>
          </Input>
        </Col>
      </div>





    </>
  )
}
