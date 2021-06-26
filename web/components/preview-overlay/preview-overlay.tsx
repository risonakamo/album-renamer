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
  const selfElement=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    // focus self on showing
    if (props.showing)
    {
      selfElement.current?.focus();
    }
  },[props.showing]);

  /** click preview panel calls dismiss event */
  function handleClick():void
  {
    props.dismissed();
  }

  /** key handler. */
  function h_key(e:React.KeyboardEvent<HTMLDivElement>):void
  {
    if (document.activeElement!=e.currentTarget)
    {
      return;
    }

    // do nothing if not showing
    if (!props.showing)
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

    // all other keys except these ones dismiss the panel
    else if (e.key=="Control" || e.key=="Alt")
    {
      return;
    }

    else
    {
      props.dismissed();
    }
  }

  /** right click dismisses */
  function h_rightclick():void
  {
    props.dismissed();
  }

  if (!props.showing)
  {
    return null;
  }

  return <div className="preview-overlay" onClick={handleClick} onKeyDown={h_key}
    tabIndex={-1} ref={selfElement} onContextMenu={h_rightclick}
  >
    <img src={props.img} className="tall"/>
  </div>;
}