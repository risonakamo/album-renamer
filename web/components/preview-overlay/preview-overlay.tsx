import React,{useEffect} from "react";
import cx from "classnames";

import "./preview-overlay.less";

interface PreviewOverlayProps
{
  showing:boolean
  img:string

  dismissed():void
}

export default function PreviewOverlay(props:PreviewOverlayProps):JSX.Element|null
{
  /** click preview panel calls dismiss event */
  function handleClick():void
  {
    props.dismissed();
  }

  if (!props.showing)
  {
    return null;
  }

  return <div className="preview-overlay" onClick={handleClick}>
    <img src={props.img} className="tall"/>
  </div>;
}