import React from "react";
import ReactDOM from "react-dom";

import ImageRow from "components/image-row/image-row";

import "./index.less";

const sampleData1:ImageData2[]=[
  {path:"../sampleimages/2.png",name:"2.png"},
  {path:"../sampleimages/1.png",name:"2.png"},
  {path:"../sampleimages/4.jpg",name:"2.png"},
  {path:"../sampleimages/1.png",name:"2.png"}
];

const sampleData2:ImageData2[]=[
  {path:"../sampleimages/8.png",name:"2.png"},
  {path:"../sampleimages/3.png",name:"2.png"},
  {path:"../sampleimages/7.png",name:"2.png"},
  {path:"../sampleimages/5.jpg",name:"2.png"},
  {path:"../sampleimages/9.jpg",name:"2.png"},
  {path:"../sampleimages/7.png",name:"2.png"},
  {path:"../sampleimages/1.png",name:"2.png"},
  {path:"../sampleimages/2.png",name:"2.png"}
];

function IndexMain():JSX.Element
{
  return <>
    <section className="header-zone top-section">

    </section>

    <section className="image-zone top-section">
      <ImageRow images={sampleData1}/>
      <ImageRow images={sampleData2}/>
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