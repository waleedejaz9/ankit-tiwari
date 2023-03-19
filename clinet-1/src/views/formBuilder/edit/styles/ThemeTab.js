import React from 'react';
import ButtonThemes from './themes/ButtonThemes';
import DefaultInput from './themes/DefaultInput';
import BasicInput from './themes/BasicInput';
import GreyBorderInput from './themes/GreyBorderInput';
import LightGreyInput from './themes/LightGreyInput';
import BorderWhiteInput from './themes/BorderWhiteInput';
import SimpleInput from './themes/SimpleInput';
import GradientNoIcon3dInput from './themes/3dGradientNoIconInput';
import SimpleCleanInput from './themes/SimpleCleanInput';
import BlackBgInput from './themes/BlackBgInput';
import BlackUnderlineInput from './themes/BlackUnderlineInput';

import './../../../../assets/scss/form-builder/themes.scss';

function ThemeTab({ editor }) {
  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const getWrapperHtmlElement = () => {
    return editor.DomComponents.getWrapper();
  };
  return (
    <div>
      {['Button'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <ButtonThemes getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}

      {['Text Area'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <DefaultInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BasicInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <GreyBorderInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <LightGreyInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderWhiteInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <SimpleInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <GradientNoIcon3dInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <SimpleCleanInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BlackBgInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BlackUnderlineInput getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}

      {['Input'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <DefaultInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BasicInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <GreyBorderInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <LightGreyInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderWhiteInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <SimpleInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <GradientNoIcon3dInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <SimpleCleanInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BlackBgInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BlackUnderlineInput getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
    </div>
  );
}

export default ThemeTab;
