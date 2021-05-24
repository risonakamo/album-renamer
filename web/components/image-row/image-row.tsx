import React,{useState,useRef} from "react";
import _ from "lodash";
import cx from "classnames";

import ThumbnailItem from "components/thumbnail-item/thumbnail-item";

import {sortGroupAlpha} from "lib/image-group-helpers";
import {useDraggedOver} from "hooks/useDraggedOver";

import "./image-row.less";

interface ImageRowProps
{
  imagegroup:ImageGroup
  selectedImages:ImageData2[]

  onThumbnailSelected?(data:ImageData2):void
  onThumbnailDeselected?(data:ImageData2):void

  onThumbnailDragStart?(data:ImageData2,selected:boolean):void
  onThumbnailDrop?(data:ImageData2):void

  onGroupDrop?(group:ImageGroup):void

  /** group was sorted. returns group that is sorted. */
  onGroupSorted?(group:ImageGroup):void
}

export default function ImageRow(props:ImageRowProps):JSX.Element
{
  const {isDraggedOver,useDraggedOverHandlers}=useDraggedOver();

  /** determine if an image data is selected. returns the selection number or -1 if not selected */
  function isSelected(data:ImageData2):number
  {
    return _.findIndex(props.selectedImages,(x:ImageData2):boolean=>{
      return x.path==data.path;
    })+1;
  }

  /**-- DRAG HANDLERS --*/
  function handleDEnter(e:React.DragEvent):void
  {
    useDraggedOverHandlers.handleDragEnter();
    e.preventDefault();
  }

  function handleDrop():void
  {
    useDraggedOverHandlers.handleDrop();
    props.onGroupDrop?.(props.imagegroup);
  }

  function handleDOver(e:React.DragEvent):void
  {
    e.preventDefault();
  }
  /**-- end DRAG HANDLERS --*/

  /** handle az sort button */
  function azSortHandler():void
  {
    props.onGroupSorted?.(sortGroupAlpha(props.imagegroup));
  }

  /** render thumbnail items */
  function renderThumbnailItems(images:ImageGroup):JSX.Element[]
  {
    return _.map(images.items,(x:ImageData2,i:number):JSX.Element=>{
      var selectionIndex:number=isSelected(x);

      return <ThumbnailItem data={x} key={i} onSelected={props.onThumbnailSelected}
        selected={!!selectionIndex} onDeselect={props.onThumbnailDeselected}
        onDropped={props.onThumbnailDrop} onDragStart={props.onThumbnailDragStart}
        selectionNumber={selectionIndex}/>;
    });
  }

  const titleAreaClass={
    "drop-target":isDraggedOver
  };

  return <div className="image-row">
    <div className={cx("title-area",titleAreaClass)} onDragEnter={handleDEnter}
      onDragLeave={useDraggedOverHandlers.handleDragLeave}
      onDrop={handleDrop} onDragOver={handleDOver}
    >
      <h2 contentEditable={true} suppressContentEditableWarning={true}>asdasd</h2>
      <div className="title-button" onClick={azSortHandler}>
        <img src="assets/temp_az-sort.png"/>
      </div>
    </div>
    <div className="thumbnail-area">
      {renderThumbnailItems(props.imagegroup)}
    </div>
  </div>;
}