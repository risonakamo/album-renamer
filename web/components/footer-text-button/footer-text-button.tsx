import React from "react";
import cx from "classnames";

import "./footer-text-button.less";

interface FooterTextButtonProps
{
  className:string

  children:React.ReactChild
  icon:string

  onClick():void
}

export default function FooterTextButton(props:FooterTextButtonProps):JSX.Element
{
  return <div className={cx("footer-text-button",props.className)} onClick={props.onClick}>
    <img src={props.icon}/>
    <p>{props.children}</p>
  </div>;
}