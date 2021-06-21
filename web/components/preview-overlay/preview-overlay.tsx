import React,{useRef} from "react";
import cx from "classnames";

import {useIsWideFit} from "hooks/useIsWideFit";

import "./preview-overlay.less";

interface PreviewOverlayProps
{
  showing:boolean
}

export default function PreviewOverlay(props:PreviewOverlayProps):JSX.Element|null
{
  const imgElement=useRef<HTMLImageElement>(null);
  const {isWideFit,handleImageLoad}=useIsWideFit(imgElement);

  // --- render ---
  if (!props.showing)
  {
    return null;
  }

  const imageClass={
    wide:isWideFit,
    tall:!isWideFit
  };

  return <div className="preview-overlay">
    <img src="../sampleimages/1.png" className={cx(imageClass)} ref={imgElement}
      onLoad={handleImageLoad}/>
  </div>;
}