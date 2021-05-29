import React from "react";
import cx from "classnames";

import "./drag-proxy.less";

interface DragProxyProps
{
  count:number

  onDragStart?():void
}

export default function DragProxy(props:DragProxyProps):JSX.Element
{
  /** handle dragging the drag box. calls dragstart event only if the box is active */
  function handleDragStart():void
  {
    if (!props.count)
    {
      return;
    }

    props.onDragStart?.();
  }

  const topClass={
    active:props.count>0
  };

  const dragBoxText:string|number=props.count || "X";

  return <div className={cx("drag-proxy",topClass)}>
    <div className="text">
      SELECTED
    </div>
    <div className="drag-box" draggable={props.count>0} onDragStart={handleDragStart}>
      {dragBoxText}
    </div>
  </div>;
}