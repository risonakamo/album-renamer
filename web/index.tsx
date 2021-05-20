import React from "react";
import ReactDOM from "react-dom";

import "./index.less";

function IndexMain():JSX.Element
{
  return <>
    <section className="header-zone top-section">

    </section>

    <section className="image-zone top-section">
      <div className="image-row">
        <div className="title-area">
          <h2>Group 1</h2>
        </div>
        <div className="thumbnail-area">
          <div className="thumbnail-item">

          </div>
        </div>
      </div>
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