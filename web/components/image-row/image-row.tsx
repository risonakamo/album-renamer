import React from "react";
import _ from "lodash";

import ThumbnailItem from "components/thumbnail-item/thumbnail-item";

import "./image-row.less";

interface ImageRowProps
{
  images:ImageData2[]
}

export default function ImageRow(props:ImageRowProps):JSX.Element
{
  /** render thumbnail items */
  function renderThumbnailItems(images:ImageData2[]):JSX.Element[]
  {
    return _.map(images,(x:ImageData2,i:number):JSX.Element=>{
      return <ThumbnailItem data={x} key={i}/>;
    });
  }

  return <div className="image-row">
    <div className="title-area">
      <h2>Group 1</h2>
    </div>
    <div className="thumbnail-area">
      {renderThumbnailItems(props.images)}
    </div>
  </div>;
}