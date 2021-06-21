import React,{useRef} from "react";
import cx from "classnames";

import {useIsWideFit} from "hooks/useIsWideFit";

import "./preview-overlay.less";

interface PreviewOverlayProps
{
  showing:boolean
  img:string
}

export default function PreviewOverlay(props:PreviewOverlayProps):JSX.Element|null
{
  // --- render ---
  if (!props.showing)
  {
    return null;
  }

  return <div className="preview-overlay">
    <img src={props.img} className="tall"/>
  </div>;
}