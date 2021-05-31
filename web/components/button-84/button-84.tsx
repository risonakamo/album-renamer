import React from "react";
import cx from "classnames";

import "./button-84.less";

interface Button84Props
{
  onClick?():void
  disabled?:boolean
}

export default function Button84(props:Button84Props):JSX.Element
{
  function handleClick():void
  {
    if (props.disabled)
    {
      return;
    }

    props.onClick?.();
  }

  const topclass={
    disabled:props.disabled
  };

  return <div className={cx("button-84",topclass)} title="Go to Rename Phase" onClick={handleClick}>
    <img src="assets/temp_go-rename-group.png"/>
    rename
  </div>;
}