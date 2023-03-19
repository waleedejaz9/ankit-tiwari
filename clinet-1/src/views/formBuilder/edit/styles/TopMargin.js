import React, { useState } from 'react';
import { Input, Label,Col } from 'reactstrap';

export default function FontSize({ getSelectedHtmlElement }) {
  const [marginTop, setMarginTop] = useState(0);

  const handleMarginTop = (e) => {
    let margin = e.target.value;
    const element = getSelectedHtmlElement();
    element.addStyle({ 'margin-top': margin + '%' });
    setMarginTop(margin);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Margin Top</Label>
        </Col>
        <Col xl="4" >
          <Input type="range" value={marginTop} onChange={handleMarginTop} />
        </Col>
        <Col xl="1" xs="1">
          <Input className="countinput p-0 text-center" value={`${marginTop}%`} onChange={handleMarginTop} style={{ width: '30px' }} />

        </Col>
      </div>



{/* 
      <div className='d-flex'>

      </div> */}
    </>
  );
}
