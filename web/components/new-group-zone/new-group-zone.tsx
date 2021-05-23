import React from "react";

import "./new-group-zone.less";

interface NewGroupZoneProps
{
  onClick?():void
}

export default function NewGroupZone(props:NewGroupZoneProps):JSX.Element
{
  /** just call on click */
  function handleClick():void
  {
    props.onClick?.();
  }

  return <div className="new-group-zone" onClick={handleClick}>
    <h1>+ new group</h1>
  </div>;
}