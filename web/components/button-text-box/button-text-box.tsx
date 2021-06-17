import React,{useRef,useState,useEffect} from "react";
import cx from "classnames";

import "./button-text-box.less";

interface ButtonTextBoxProps
{
  label:string
  buttonLabel:string

  className?:string

  autoClear?:boolean

  errorOnEmpty?:boolean
  errorLabel?:string

  value?:string

  onSubmit?(value:string):void
  onBlur?(value:string):void
}

export default function ButtonTextBox(props:ButtonTextBoxProps):JSX.Element
{
  const [inputValue,setInputValue]=useState<string>("");
  const inputBox=useRef<HTMLInputElement>(null);

  // external value set
  useEffect(()=>{
    if (props.value)
    {
      setInputValue(props.value);
    }
  },[props.value]);

  /** button clicked. submit the value */
  function handleButtonClick():void
  {
    props.onSubmit?.(inputBox.current!.value);

    if (props.autoClear)
    {
      setInputValue("");
    }
  }

  /** input box key handler. do same as click on enter button */
  function handleInputEnter(e:React.KeyboardEvent<HTMLInputElement>):void
  {
    if (e.key=="Enter")
    {
      handleButtonClick();
      e.currentTarget.blur();
    }
  }

  /** input blurred. forward input value to props onBlur */
  function handleInputBlur(e:React.FocusEvent<HTMLInputElement>):void
  {
    props.onBlur?.(inputValue);
  }

  /** update input value */
  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>):void
  {
    setInputValue(e.currentTarget.value);
  }

  const erroring:boolean=!inputValue.length && !!props.errorOnEmpty;

  var hoverText:string|undefined;
  if (erroring && props.errorLabel)
  {
    hoverText=props.errorLabel;
  }

  const topClass={
    error:erroring
  };

  return <div className={cx("button-text-box",props.className,topClass)} title={hoverText}>
    <div className="label">
      {props.label}
    </div>
    <div className="input-rect">
      <input type="text" ref={inputBox} onKeyPress={handleInputEnter} onBlur={handleInputBlur}
        onChange={handleInputChange} value={inputValue}/>
      <div className="button-zone">
        <div className="mini-button" onClick={handleButtonClick}>
          {props.buttonLabel}
        </div>
      </div>
    </div>
  </div>;
}