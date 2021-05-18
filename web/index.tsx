import React from "react";
import ReactDOM from "react-dom";

// import "./index.less";

function IndexMain():JSX.Element
{
  return <>
    hello2
  </>;
}

function main()
{
  ReactDOM.render(<IndexMain/>,document.querySelector(".main"));
}

window.onload=main;