import React,{useRef} from "react";
import cx from "classnames";

import "./button-text-box.less";

interface ButtonTextBoxProps
{
  label:string
  buttonLabel:string
  className?:string

  autoClear?:boolean

  onSubmit?(value:string):void
}

export default function ButtonTextBox(props:ButtonTextBoxProps):JSX.Element
{
  const inputBox=useRef<HTMLInputElement>(null);

  /** button clicked. submit the value */
  function handleButtonClick():void
  {
    props.onSubmit?.(inputBox.current!.value);

    if (props.autoClear)
    {
      inputBox.current!.value="";
    }
  }

  /** input box key handler. do same as click on enter button */
  function handleInputEnter(e:React.KeyboardEvent):void
  {
    if (e.key=="Enter")
    {
      handleButtonClick();
    }
  }

  return <div className={cx("button-text-box",props.className)}>
    <div className="label">
      {props.label}
    </div>
    <div className="input-rect">
      <input type="text" ref={inputBox} onKeyPress={handleInputEnter}/>
      <div className="button-zone">
        <div className="mini-button" onClick={handleButtonClick}>
          {props.buttonLabel}
        </div>
      </div>
    </div>
  </div>;
}