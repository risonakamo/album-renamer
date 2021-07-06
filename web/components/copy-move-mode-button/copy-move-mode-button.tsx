// copy move mode button. more specific implementation using FooterTextButton

import React from "react";

import FooterTextButton from "components/footer-text-button/footer-text-button";

import "./copy-move-mode-button.less";

interface CopyMoveModeButtonProps
{
  copyMode:boolean

  // provides the desired NEW state
  onToggledCopyMode(newMode:boolean):void
}

export default function CopyMoveModeButton(props:CopyMoveModeButtonProps):JSX.Element
{
  /** clicked this button. call toggled event with the opposite current copy mode */
  function h_clicked():void
  {
    props.onToggledCopyMode(!props.copyMode);
  }

  const copyButtonText:string=props.copyMode?"COPY":"MOVE";
  const copyButtonImg:string=props.copyMode?"temp_copy-indicate":"temp_move-indicate";
  const copyButtonClass:string=props.copyMode?"copy-mode":"move-mode";

  return <FooterTextButton className={copyButtonClass} icon={`assets/${copyButtonImg}.png`}
    onClick={h_clicked}
  >
    {copyButtonText}
  </FooterTextButton>;
}