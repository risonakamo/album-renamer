import React,{useRef} from "react";
import cx,{Mapping} from "classnames";

import {useIsWideFit} from "hooks/useIsWideFit";

import "./mini-square-thumbnail.less";

interface MiniSquareThumbnailProps
{
  image:string
  size:number
}

export default function MiniSquareThumbnail(props:MiniSquareThumbnailProps):JSX.Element
{
  const imgElement=useRef<HTMLImageElement>(null);
  const {isWideFit,handleImageLoad}=useIsWideFit(imgElement);

  const sizeString:string=`${props.size}px`;

  const topClass:Mapping={
    wide:isWideFit
  };

  const topStyle:React.CSSProperties={
    width:sizeString,
    height:sizeString
  };

  return <div className={cx("mini-square-thumbnail",topClass)} style={topStyle}>
    <img src={props.image} ref={imgElement} onLoad={handleImageLoad}/>
  </div>;
}