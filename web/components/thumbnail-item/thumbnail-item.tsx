import React,{useRef,useState} from "react";
import cx from "classnames";

import {useDraggedOver} from "hooks/useDraggedOver";
import {useIsWideFit} from "hooks/useIsWideFit";

import "./thumbnail-item.less";

interface ThumbnailItemProps
{
  data:ImageData2
  selected?:boolean
  selectionNumber?:number

  dragValidOverride?:boolean

  onSelected?(data:ImageData2):void
  onDeselect?(data:ImageData2):void
  onDragStart?(data:ImageData2,selected:boolean):void
  onDropped?(data:ImageData2):void
}

export default function ThumbnailItem(props:ThumbnailItemProps):JSX.Element
{
  const {isDraggedOver,useDraggedOverHandlers}=useDraggedOver();

  const dragActive=useRef<boolean>(false);

  const imgElement=useRef<HTMLImageElement>(null);

  const {isWideFit,handleImageLoad}=useIsWideFit(imgElement);

  /*-- HANDLERS --*/
  /** handle item clicked */
  function handleClick():void
  {
    if (!props.selected)
    {
      props.onSelected?.(props.data);
    }

    else
    {
      props.onDeselect?.(props.data);
    }
  }

  /** DRAG HANDLERS */
  function dragBegin():void
  {
    props.onDragStart?.(props.data,!!props.selected);
    dragActive.current=true;
  }

  function handleDragEnd():void
  {
    dragActive.current=false;
  }

  function handleDrop():void
  {
    useDraggedOverHandlers.handleDrop();

    // cancel if dropped on itself
    if (!dragActive.current)
    {
      props.onDropped?.(props.data);
    }

    dragActive.current=false;
  }

  function handleDragEnter(e:React.DragEvent):void
  {
    e.preventDefault();
    useDraggedOverHandlers.handleDragEnter(e);
  }

  function handleDragOver(e:React.DragEvent):void
  {
    e.preventDefault();
  }

  /*-- RENDER --*/
  const imgElementClasses={
    wide:isWideFit,
    tall:!isWideFit
  };

  const imageSpaceClass={
    selected:props.selected,
    "drop-target":isDraggedOver.draggedOver && (!isDraggedOver.hasFiles || props.dragValidOverride)
  };

  const selectionNumber:number=props.selectionNumber || 0;

  return <div className="thumbnail-item" onClick={handleClick} onDragStart={dragBegin}
    onDrop={handleDrop} onDragEnter={handleDragEnter} onDragOver={handleDragOver}
    onDragLeave={useDraggedOverHandlers.handleDragLeave} onDragEnd={handleDragEnd}
    draggable={true}
  >
    <div className={cx("image-space",imageSpaceClass)}>
      <img src={props.data.path} className={cx(imgElementClasses)}
        ref={imgElement} onLoad={handleImageLoad}/>
      <div className="selected-overlay">
        <p>{selectionNumber}</p>
      </div>
      <div className="drop-overlay">
        <img src="assets/temp_drop-arrow.png"/>
      </div>
    </div>
    <div className="title-zone">
      <p>{props.data.name}</p>
    </div>
  </div>;
}