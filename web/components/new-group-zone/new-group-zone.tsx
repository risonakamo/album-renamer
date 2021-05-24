import React from "react";
import cx from "classnames";

import {useDraggedOver} from "hooks/useDraggedOver";

import "./new-group-zone.less";

interface NewGroupZoneProps
{
  onClick?():void
  onDrop?():void
}

export default function NewGroupZone(props:NewGroupZoneProps):JSX.Element
{
  const {isDraggedOver,useDraggedOverHandlers}=useDraggedOver();

  /** just call on click */
  function handleClick():void
  {
    props.onClick?.();
  }

  /**-- DRAG HANDLERS --*/
  function handleDrop(e:React.DragEvent):void
  {
    useDraggedOverHandlers.handleDrop();
    props.onDrop?.();
  }

  function handleDOver(e:React.DragEvent):void
  {
    e.preventDefault();
  }

  function handleDEnter(e:React.DragEvent):void
  {
    useDraggedOverHandlers.handleDragEnter();
    e.preventDefault();
  }

  const groupZoneClasses={
    "drop-target":isDraggedOver
  };

  return <div className={cx("new-group-zone",groupZoneClasses)} onClick={handleClick} onDrop={handleDrop}
    onDragOver={handleDOver} onDragEnter={handleDEnter} onDragLeave={useDraggedOverHandlers.handleDragLeave}
  >
    <h1>+ new group</h1>
  </div>;
}