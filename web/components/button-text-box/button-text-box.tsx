import React from "react";

import "./button-text-box.less";

interface ButtonTextBoxProps
{

}

export default function ButtonTextBox(props:ButtonTextBoxProps):JSX.Element
{
  return <div className="button-text-box">
    <div className="label">
      BASEPATH
    </div>
    <div className="input-rect">
      <input type="text"/>
      <div className="button-zone">
        <div className="mini-button">
          BROWSE
        </div>
      </div>
    </div>
  </div>;
}