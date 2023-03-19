import React from 'react'
import { Col, Input, Label } from 'reactstrap'

export default function HeadingType({getSelectedHtmlElement}) {
    const handleSelectItemChange =(e)=>{
        
        getSelectedHtmlElement().removeClass('h1 h2 h3 h4 h5 h6')
        let classes = getSelectedHtmlElement().getClasses()
        getSelectedHtmlElement().setClass([...classes,e.target.value])
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes = {...attributes,htype: e.target.value}
        getSelectedHtmlElement().setAttributes(attributes)
    }
  return (
    <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
        <Label>Type</Label>
      </Col>
      <Col xl="6">
        <Input type="select" onChange={handleSelectItemChange}>
            <option value='h1'>H1</option>
            <option value='h2'>H2</option>
            <option value='h3'>H3</option>
            <option value='h4'>H4</option>
            <option value='h5'>H5</option>
            <option value='h6'>H6</option>
        </Input>
      </Col>
    </div>
  )
}
