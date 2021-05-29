import React from "react";

import "./drag-proxy.less";

export default function DragProxy():JSX.Element
{
  return <div className="drag-proxy active">
    <div className="text">
      SELECTED
    </div>
    <div className="drag-box" draggable={true}>
      3
    </div>
  </div>;
}