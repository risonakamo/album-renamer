import React from "react";
import cx from "classnames";

import "./footer-text-button.less";

interface FooterTextButtonProps
{
  className?:string

  children?:React.ReactChild
  icon:string
}

export default function FooterTextButton(props:FooterTextButtonProps):JSX.Element
{
  return <div className={cx("footer-text-button",props.className)}>
    <img src={props.icon}/>
    <p>{props.children}</p>
  </div>;
}