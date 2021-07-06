import React from "react";
import cx from "classnames";

import "./footer-text-button.less";

interface FooterTextButtonProps
{
  className?:string
}

export default function FooterTextButton(props:FooterTextButtonProps):JSX.Element
{
  return <div className={cx("footer-text-button",props.className)}>
    <img src="assets/temp_copy-indicate.png"/>
    <p>COPY</p>
  </div>;
}