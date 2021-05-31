import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {Provider,useSelector} from "react-redux";

import ReorderPhaseMain from "components/reorder-phase-main/reorder-phase-main";

import thestore from "store/store";

import "./index.less";

function IndexMain():JSX.Element
{
  const theImageGroups2=useSelector<TheStore,ImageGroup[]>(s=>s.imageGroups);
  const theSelectedImages2=useSelector<TheStore,ImageData2[]>(s=>s.selectedImages);

  return <>
    <ReorderPhaseMain/>
  </>;
}

function main()
{
  ReactDOM.render(<Provider store={thestore}><IndexMain/></Provider>,document.querySelector(".main"));
}

window.onload=main;