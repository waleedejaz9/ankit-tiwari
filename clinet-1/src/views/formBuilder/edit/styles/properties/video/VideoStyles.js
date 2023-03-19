import React, { Fragment, useState } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';

export default function VideoStyles({ getSelectedHtmlElement }) {

  const handleInputChanged = (e) => {
    let elements = getSelectedHtmlElement().getAttributes();
    elements = {...elements,[e.target.name]:e.target.value}
    getSelectedHtmlElement().setAttributes(elements)
  };
  return (
    <Fragment>
      <Row>
        <Col xl="6" xs="6">
          <Label>Video Type</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input type="select" name='videotype' onChange={handleInputChanged}>
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="wistia">Wistia</option>
          </Input>
        </Col>
      </Row>
      <div>
        <div>
          <Label>Video Link</Label>
          <br />
          <Label>Paste your video link to show</Label>
        </div>
        <Input type="url" name='src' onChange={handleInputChanged} />
      </div>
      <div>
        <Label>Video Width</Label>
        <div className="d-flex justify-content-between">
          <Input type="number" name='width' onChange={handleInputChanged}/> <span className="my-auto ms-50">px</span>
        </div>
      </div>
      <div>
        <Label>Video Height</Label>
        <div className="d-flex justify-content-between">
          <Input type="number" name='height' onChange={handleInputChanged}/> <span className="my-auto ms-50">px</span>
        </div>
      </div>
      <div>
        <Label>Title</Label>
        <div className="d-flex justify-content-between">
          <Input type="text" name='title' onChange={handleInputChanged}/> 
        </div>
      </div>
    </Fragment>
  );
}
