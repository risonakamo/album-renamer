import React from "react";

import "./button-84.less";

interface Button84Props
{
  onClick?():void
}

export default function Button84(props:Button84Props):JSX.Element
{
  return <div className="button-84" title="Go to Rename Phase" onClick={props.onClick}>
    <img src="assets/temp_go-rename-group.png"/>
    rename
  </div>;
}