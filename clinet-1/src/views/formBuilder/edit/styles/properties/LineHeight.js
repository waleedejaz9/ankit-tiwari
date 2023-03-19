import React from 'react';
import { Input, Label } from 'reactstrap';

export default function LineHeight({ getSelectedHtmlElement }) {
  function handleAddOptionForULorOL(event) {
    const lineHeight = event.target.value;
    const selectedElement = getSelectedHtmlElement();

    if (!selectedElement) {
      console.warn('No element selected');
      return;
    }
    const ulOrOl = selectedElement.closest('ul, ol');
    if (ulOrOl) {
      ulOrOl.style.lineHeight = lineHeight;
    } else {
      selectedElement.style.lineHeight = lineHeight;
    }
  }

  return (
    <>
      <Label>Line Height</Label>
      <Input type="select" onChange={handleAddOptionForULorOL}>
        <option value="auto">Auto</option>
        <option value="0.7em">0.7em</option>
        <option value="1em">1em</option>
        <option value="1.3em">1.3em</option>
        <option value="1.4em">1.4em</option>
        <option value="1.5em">1.5em</option>
      </Input>
    </>
  );
}
