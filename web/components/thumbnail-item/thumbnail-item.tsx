import React from "react";

import "./thumbnail-item.less";

interface ThumbnailItemProps
{
  data:ImageData2
}

export default function ThumbnailItem(props:ThumbnailItemProps):JSX.Element
{
  return <div className="thumbnail-item">
    <div className="image-space">
      <img src={props.data.path} className="wide"/>
    </div>
    <div className="title-zone">
      <p>{props.data.name}</p>
    </div>
  </div>;
}