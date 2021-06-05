import React,{useRef} from "react";
import cx from "classnames";

import {useIsWideFit} from "hooks/useIsWideFit";

import "./mini-square-thumbnail.less";

interface MiniSquareThumbnailProps
{

}

export default function MiniSquareThumbnail(props:MiniSquareThumbnailProps):JSX.Element
{
  const imgElement=useRef<HTMLImageElement>(null);
  const {isWideFit,handleImageLoad}=useIsWideFit(imgElement);

  const topClass={
    wide:isWideFit
  };

  return <div className={cx("mini-square-thumbnail",topClass)}>
    <img src="../sampleimages/1.png" ref={imgElement} onLoad={handleImageLoad}/>
  </div>;
}