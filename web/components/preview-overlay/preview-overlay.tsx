import React,{useEffect,useRef} from "react";
import cx from "classnames";

import "./preview-overlay.less";

interface PreviewOverlayProps
{
  showing:boolean
  img:string

  dismissed():void

  navForward():void
  navBackward():void
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
      // do nothing if not showing
      if (!showingRef.current)
      {
        return;
      }

      // navigate on left/right
      if (e.key=="ArrowRight" || e.key=="d" || e.key=="D")
      {
        props.navForward();
      }

      else if (e.key=="ArrowLeft" || e.key=="a" || e.key=="A")
      {
        props.navBackward();
      }

      // all other keys except Ctrl dismiss the panel
      else if (e.key=="Control")
      {
        return;
      }

      else
      {
        props.dismissed();
      }
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