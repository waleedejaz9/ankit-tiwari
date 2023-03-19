import React from 'react'
import { Input, Label,Col} from 'reactstrap';

export default function BackgroundColor({ getSelectedHtmlElement }) {
  const handleStyle = (e, name) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ [name]: e.target.value });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="3">
          <Label>Background Color</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            className="p-0"
            style={{
              // width: 230,
              height: '40px'
            }}
            size="small"
            type="color"
            onChange={(e) => {
              handleStyle(e, 'background');
            }}
          />
        </Col>
      </div>




    </>
  )
}
