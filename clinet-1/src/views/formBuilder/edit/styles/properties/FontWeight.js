import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';

export default function FontWeight({ getSelectedHtmlElement }) {
  const handleFontWeightChange = (select) => {
    const element = getSelectedHtmlElement();
    if (!select || !select.options) {
      console.error("Invalid 'select' element passed to handleFontWeightChange.");
      return;
    }
    const fontWeight = select.options[select.selectedIndex].value;
    element.addStyle({ 'font-weight': fontWeight });
  };

  return (
    <>
      <Label>Font Weight</Label>
      <Input type="select" onChange={(event) => handleFontWeightChange(event.target)}>
        <option value="normal">Normal</option>
        <option value="bold">Bold</option>
        <option value="bolder">Bolder</option>
        <option value="lighter">Lighter</option>
      </Input>
    </>
  );
}
