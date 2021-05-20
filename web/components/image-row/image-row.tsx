import React from "react";

import ThumbnailItem from "components/thumbnail-item/thumbnail-item";

import "./image-row.less";

interface ImageRowProps
{
  images:ImageData[]
}

export default function ImageRow(props:ImageRowProps):JSX.Element
{
  return <div className="image-row">
    <div className="title-area">
      <h2>Group 1</h2>
    </div>
    <div className="thumbnail-area">
      <ThumbnailItem/>
      <ThumbnailItem/>
      <ThumbnailItem/>
    </div>
  </div>;
}