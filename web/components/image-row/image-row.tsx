import React,{useEffect,useState} from "react";
import _ from "lodash";
import cx from "classnames";
import {Event} from "electron";

import ThumbnailItem from "components/thumbnail-item/thumbnail-item";

import {sortGroupAlpha} from "lib/image-group-helpers";
import {useDraggedOver} from "hooks/useDraggedOver";
import {imageDataFromFileList} from "lib/file-handlers";

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

  onDropNewImages?(data:ImageData2[],group:ImageGroup):void
}

export default function ImageRow(props:ImageRowProps):JSX.Element
{
  const {isDraggedOver,useDraggedOverHandlers}=useDraggedOver();
  const {
    isDraggedOver:isDraggedOverWithFiles,
    useDraggedOverHandlers:draggedOverWithFilesHandlers
  }=useDraggedOver(true);
  const [initGroupName,setInitGroupName]=useState<string>("");

  // initialise group name
  useEffect(()=>{
    setInitGroupName(props.imagegroup.name);
  },[props.imagegroup.name]);

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
    useDraggedOverHandlers.handleDragEnter(e);
    e.preventDefault();
  }

  function handleDrop(e:React.DragEvent):void
  {
    useDraggedOverHandlers.handleDrop();
    if (!e.dataTransfer.files.length)
    {
      props.onGroupDrop?.(props.imagegroup);
    }
  }

  function handleDOver(e:React.DragEvent):void
  {
    e.preventDefault();
  }
  /**-- end DRAG HANDLERS --*/

  /**-- drag handlers 2 --*/
  function handleTopDrop(e:React.DragEvent):void
  {
    draggedOverWithFilesHandlers.handleDrop();
    if (e.dataTransfer.files.length)
    {
      props.onDropNewImages?.(imageDataFromFileList(e.dataTransfer.files),props.imagegroup);
    }
  }

  function handleTopDOver(e:React.DragEvent):void
  {
    e.preventDefault();
  }

  function handleTopDEnter(e:React.DragEvent):void
  {
    draggedOverWithFilesHandlers.handleDragEnter(e);
    e.preventDefault();
  }
  /**-- end drag handlers 2 --*/

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

  const topElementClass={
    "drop-target":isDraggedOverWithFiles
  };

  return <div className={cx("image-row",topElementClass)} onDrop={handleTopDrop}
    onDragEnter={handleTopDEnter} onDragOver={handleTopDOver}
    onDragLeave={draggedOverWithFilesHandlers.handleDragLeave}
  >
    <div className={cx("title-area",titleAreaClass)} onDragEnter={handleDEnter}
      onDragLeave={useDraggedOverHandlers.handleDragLeave}
      onDrop={handleDrop} onDragOver={handleDOver}
    >
      <h2 contentEditable={true} suppressContentEditableWarning={true}>{initGroupName}</h2>
      <div className="title-button" onClick={azSortHandler}>
        <img src="assets/temp_az-sort.png"/>
      </div>
    </div>
    <div className="thumbnail-area">
      {renderThumbnailItems(props.imagegroup)}
    </div>
  </div>;
}