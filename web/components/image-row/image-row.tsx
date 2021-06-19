import React,{useEffect,useState,useRef} from "react";
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

  imageSize:number

  dragValidOverride?:boolean

  onThumbnailSelected?(data:ImageData2):void
  onThumbnailDeselected?(data:ImageData2):void

  onThumbnailDragStart?(data:ImageData2,selected:boolean):void
  onThumbnailDrop?(data:ImageData2):void

  onGroupDrop?(group:ImageGroup):void

  /** group was sorted. returns group that is sorted. */
  onGroupSorted?(group:ImageGroup):void

  onDropNewImages?(data:ImageData2[],group:ImageGroup):void

  onGroupRenamed?(group:ImageGroup):void
}

export default function ImageRow(props:ImageRowProps):JSX.Element
{
  // dragged over for title area
  const {isDraggedOver,useDraggedOverHandlers}=useDraggedOver();

  // dragged over for top level
  const {
    isDraggedOver:isDraggedOver2,
    useDraggedOverHandlers:draggedOverHandlers2
  }=useDraggedOver();

  const [initGroupName,setInitGroupName]=useState<string>("");

  const groupNameInput=useRef<HTMLHeadingElement>(null);

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
    draggedOverHandlers2.handleDrop();
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
    draggedOverHandlers2.handleDragEnter(e);
    e.preventDefault();
  }
  /**-- end drag handlers 2 --*/

  /** handle az sort button */
  function azSortHandler():void
  {
    props.onGroupSorted?.(sortGroupAlpha(props.imagegroup));
  }

  /** on press enter in edit group name field, submit */
  function handleEditGroupNameKey(e:React.KeyboardEvent):void
  {
    if (e.key=="Enter")
    {
      e.preventDefault();
      groupNameInput.current?.blur();
    }
  }

  /** on group edit name blur, submit rename */
  function handleEditGroupNameBlur():void
  {
    props.onGroupRenamed?.({
      ...props.imagegroup,
      name:groupNameInput.current?.innerText || "error_name"
    });
  }

  /** render thumbnail items */
  function renderThumbnailItems(images:ImageGroup):JSX.Element[]
  {
    return _.map(images.items,(x:ImageData2,i:number):JSX.Element=>{
      var selectionIndex:number=isSelected(x);

      return <ThumbnailItem data={x} key={i} onSelected={props.onThumbnailSelected}
        selected={!!selectionIndex} onDeselect={props.onThumbnailDeselected}
        onDropped={props.onThumbnailDrop} onDragStart={props.onThumbnailDragStart}
        selectionNumber={selectionIndex} dragValidOverride={props.dragValidOverride}
        imageSize={props.imageSize}/>;
    });
  }

  const titleAreaClass={
    // title area gains drop target style when it is dragged over, and there are no files, or the
    // drag override is set
    "drop-target":isDraggedOver.draggedOver && (!isDraggedOver.hasFiles || props.dragValidOverride)
  };

  const topElementClass={
    // top element gains drop target style when dragged over, and has files, and drag valid override is
    // NOT set (should never happen for valid files)
    "drop-target":isDraggedOver2.draggedOver && isDraggedOver2.hasFiles && !props.dragValidOverride
  };

  return <div className={cx("image-row",topElementClass)} onDrop={handleTopDrop}
    onDragEnter={handleTopDEnter} onDragOver={handleTopDOver}
    onDragLeave={draggedOverHandlers2.handleDragLeave}
  >
    <div className={cx("title-area",titleAreaClass)} onDragEnter={handleDEnter}
      onDragLeave={useDraggedOverHandlers.handleDragLeave}
      onDrop={handleDrop} onDragOver={handleDOver}
    >
      <h2 contentEditable={true} suppressContentEditableWarning={true} ref={groupNameInput}
        onKeyDown={handleEditGroupNameKey} onBlur={handleEditGroupNameBlur}
      >
        {initGroupName}
      </h2>
      <div className="title-button" onClick={azSortHandler}>
        <img src="assets/temp_az-sort.png"/>
      </div>
    </div>
    <div className="thumbnail-area">
      {renderThumbnailItems(props.imagegroup)}
    </div>
  </div>;
}