import React from "react";
import cx from "classnames";

import {useDraggedOver} from "hooks/useDraggedOver";
import {imageDataFromFileList} from "lib/file-handlers";

import "./initial-drop-zone.less";

interface InitialDropZoneProps
{
  onDropFiles?(data:ImageData2[]):void
}

export default function InitialDropZone(props:InitialDropZoneProps):JSX.Element
{
  const {isDraggedOver,useDraggedOverHandlers}=useDraggedOver();

  /** trigger drop with files event, if the drop payload has items */
  function handleDrop(e:React.DragEvent):void
  {
    useDraggedOverHandlers.handleDrop();

    if (!e.dataTransfer.files.length)
    {
      return;
    }

    var newimages:ImageData2[]=imageDataFromFileList(e.dataTransfer.files);
    if (newimages.length)
    {
      props.onDropFiles?.(newimages);
    }
  }

  /** prevent default to enable drop target */
  function handleDrOver(e:React.DragEvent):void
  {
    e.preventDefault();
  }

  /** prevent default to enable drop target. pass to isdragover */
  function handleDrEnter(e:React.DragEvent):void
  {
    e.preventDefault();
    useDraggedOverHandlers.handleDragEnter(e);
  }

  /** just pass to isdragover */
  function handleDrLeave(e:React.DragEvent):void
  {
    e.preventDefault();
    useDraggedOverHandlers.handleDragLeave(e);
  }

  const topClass={
    active:isDraggedOver.draggedOver
  };

  return <div className={cx("initial-drop-zone",topClass)} onDrop={handleDrop}
    onDragOver={handleDrOver} onDragEnter={handleDrEnter} onDragLeave={handleDrLeave}
  >
    <h1>+ drag in items</h1>
  </div>;
}