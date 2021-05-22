import React,{useState,useRef} from "react";
import _ from "lodash";
import cx from "classnames";

import ThumbnailItem from "components/thumbnail-item/thumbnail-item";

import "./image-row.less";

interface ImageRowProps
{
  images:ImageGroup
  selectedImages:ImageData2[]

  onThumbnailSelected?(data:ImageData2):void
  onThumbnailDeselected?(data:ImageData2):void
}

export default function ImageRow(props:ImageRowProps):JSX.Element
{
  const [isDraggedOver,setDraggedOver]=useState<boolean>(false);

  const dragEnterCount=useRef<number>(0);

  /** determine if an image data is selected */
  function isSelected(data:ImageData2):boolean
  {
    return _.find(props.selectedImages,(x:ImageData2):boolean=>{
      return x.path==data.path;
    })!=undefined;
  }

  /** DRAG HANDLERS */
  function handleDEnter(e:React.DragEvent):void
  {
    e.preventDefault();
    setDraggedOver(true);
    dragEnterCount.current++;
  }

  function handleDLeave():void
  {
    dragEnterCount.current--;
    if (!dragEnterCount.current)
    {
      setDraggedOver(false);
    }
  }

  function handleDrop():void
  {
    setDraggedOver(false);
    dragEnterCount.current=0;
  }

  function handleDOver(e:React.DragEvent):void
  {
    e.preventDefault();
  }

  /** render thumbnail items */
  function renderThumbnailItems(images:ImageGroup):JSX.Element[]
  {
    return _.map(images.items,(x:ImageData2,i:number):JSX.Element=>{
      return <ThumbnailItem data={x} key={i} onSelected={props.onThumbnailSelected}
        selected={isSelected(x)} onDeselect={props.onThumbnailDeselected}/>;
    });
  }

  const titleAreaClass={
    "drop-target":isDraggedOver
  };

  return <div className="image-row">
    <div className={cx("title-area",titleAreaClass)} onDragEnter={handleDEnter} onDragLeave={handleDLeave}
      onDrop={handleDrop} onDragOver={handleDOver}
    >
      <h2>{props.images.name}</h2>
    </div>
    <div className="thumbnail-area">
      {renderThumbnailItems(props.images)}
    </div>
  </div>;
}