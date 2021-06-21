import React,{useEffect,useRef} from "react";
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
  // synced with showing prop
  const showingRef=useRef<boolean>(false);

  // sync showingRef with props for effect hooks
  useEffect(()=>{
    showingRef.current=props.showing;
  },[props.showing]);

  useEffect(()=>{
    document.addEventListener("keydown",(e:KeyboardEvent)=>{
      // dismiss on any keyboard click except when it is already not showing
      // or ctrl button was pressed.
      if (!showingRef.current || e.key=="Control")
      {
        return;
      }

      props.dismissed();
    });
  },[]);

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