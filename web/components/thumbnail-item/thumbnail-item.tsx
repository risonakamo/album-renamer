import React from "react";

import "./thumbnail-item.less";

export default function ThumbnailItem():JSX.Element
{
  return <div className="thumbnail-item">
    <div className="image-space">
      <img src="C:\Users\ktkm\Desktop\album-renamer\sampleimages\5.jpg" className="wide"/>
    </div>
    <div className="title-zone">
      <p>7bbae7be1ab12a9cd64b6d6cc96786f2.png</p>
    </div>
  </div>;
}