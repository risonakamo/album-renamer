import React from "react";
import cx from "classnames";

import "./button-text-box.less";

interface ButtonTextBoxProps
{
  label:string
  buttonLabel:string
  className?:string
}

export default function ButtonTextBox(props:ButtonTextBoxProps):JSX.Element
{
  return <div className={cx("button-text-box",props.className)}>
    <div className="label">
      {props.label}
    </div>
    <div className="input-rect">
      <input type="text"/>
      <div className="button-zone">
        <div className="mini-button">
          {props.buttonLabel}
        </div>
      </div>
    </div>
  </div>;
}