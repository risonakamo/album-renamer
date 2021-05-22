import React from "react";
import _ from "lodash";

import ThumbnailItem from "components/thumbnail-item/thumbnail-item";

import "./image-row.less";

interface ImageRowProps
{
  images:ImageData2[]
  selectedImages:ImageData2[]

  onThumbnailSelected?(data:ImageData2):void
  onThumbnailDeselected?(data:ImageData2):void
}

export default function ImageRow(props:ImageRowProps):JSX.Element
{
  /** determine if an image data is selected */
  function isSelected(data:ImageData2):boolean
  {
    return _.find(props.selectedImages,(x:ImageData2):boolean=>{
      return x.path==data.path;
    })!=undefined;
  }

  /** render thumbnail items */
  function renderThumbnailItems(images:ImageData2[]):JSX.Element[]
  {
    return _.map(images,(x:ImageData2,i:number):JSX.Element=>{
      return <ThumbnailItem data={x} key={i} onSelected={props.onThumbnailSelected}
        selected={isSelected(x)} onDeselect={props.onThumbnailDeselected}/>;
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