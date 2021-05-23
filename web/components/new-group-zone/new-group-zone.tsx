import React,{useState,useRef} from "react";
import cx from "classnames";

import "./new-group-zone.less";

interface NewGroupZoneProps
{
  onClick?():void
  onDrop?():void
}

export default function NewGroupZone(props:NewGroupZoneProps):JSX.Element
{
  const [isDraggedOver,setDraggedOver]=useState<boolean>(false);

  const dragEnterCount=useRef<number>(0);

  /** just call on click */
  function handleClick():void
  {
    props.onClick?.();
  }

  /**-- DRAG HANDLERS --*/
  function handleDrop(e:React.DragEvent):void
  {
    props.onDrop?.();
    setDraggedOver(false);
    dragEnterCount.current=0;
  }

  function handleDOver(e:React.DragEvent):void
  {
    e.preventDefault();
  }

  function handleDEnter(e:React.DragEvent):void
  {
    e.preventDefault();
    setDraggedOver(true);
    dragEnterCount.current++;
  }

  function handleDLeave(e:React.DragEvent):void
  {
    dragEnterCount.current--;
    if (!dragEnterCount.current)
    {
      setDraggedOver(false);
    }
  }

  const groupZoneClasses={
    "drop-target":isDraggedOver
  };

  return <div className={cx("new-group-zone",groupZoneClasses)} onClick={handleClick} onDrop={handleDrop}
    onDragOver={handleDOver} onDragEnter={handleDEnter} onDragLeave={handleDLeave}
  >
    <h1>+ new group</h1>
  </div>;
}