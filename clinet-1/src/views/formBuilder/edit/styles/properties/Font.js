import React from 'react'
import { Input, Label,Col } from 'reactstrap';
import FontFamily from '../../configuration/fontfamily';

export default function Font({ getSelectedHtmlElement }) {
  const handlestyle = (e, name) => {
    const element = getSelectedHtmlElement();
    console.log(e.target.value)
    element.addStyle({ [name]: e.target.value });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
          <Label>Font</Label>
          {/* <Label>Button Text</Label> */}
        </Col>
        <Col xl="6">
          <Input
            type="select"
            // showSearch
            //getPopupContainer={() => document.getElementById('button')}
            // filterOption={(input, option) =>
            //   option.children.toLowerCase().includes(input.toLowerCase())
            // }
            onChange={(e) => {
              handlestyle(e, 'font-family');
            }}
          >
            {FontFamily.families.map((item, i) => {
              return (
                <option value={item} key={i}>
                  {item}
                </option>
              );
            })}
          </Input>


        </Col>
      </div>






    </>
  )
}
