import React from "react";
import ReactDOM from "react-dom";

import ImageRow from "components/image-row/image-row";

import "./index.less";

function IndexMain():JSX.Element
{
  return <>
    <section className="header-zone top-section">

    </section>

    <section className="image-zone top-section">
      <ImageRow images={[]}/>
    </section>

    <footer className="footer-zone top-section">

    </footer>
  </>;
}

function main()
{
  ReactDOM.render(<IndexMain/>,document.querySelector(".main"));
}

window.onload=main;