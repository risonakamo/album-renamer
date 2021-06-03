import React from "react";

import "./rename-group.less";

interface RenameGroupProps
{

}

export default function RenameGroup(props:RenameGroupProps):JSX.Element
{
  return <div className="rename-group">
    <div className="checkbox-zone zone">

    </div>
    <div className="entry-zone zone">
      <input className="group-name-input"/>
    </div>
    <div className="thumbnail-zone zone">

    </div>
  </div>;
}