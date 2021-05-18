import React from "react";
import ReactDOM from "react-dom";

import "./index.less";

function IndexMain():JSX.Element
{
  return <>
    <div className="header-zone">

    </div>
    <div className="image-zone">

    </div>
    <footer className="footer-zone">

    </footer>
  </>;
}

function main()
{
  ReactDOM.render(<IndexMain/>,document.querySelector(".main"));
}

window.onload=main;