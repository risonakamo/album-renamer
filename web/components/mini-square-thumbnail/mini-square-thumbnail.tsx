import React from "react";

import "./mini-square-thumbnail.less";

interface MiniSquareThumbnailProps
{

}

export default function MiniSquareThumbnail(props:MiniSquareThumbnailProps):JSX.Element
{
  return <div className="mini-square-thumbnail">
    <img src="../sampleimages/1.png"/>
  </div>;
}