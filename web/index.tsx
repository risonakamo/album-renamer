import React,{useState} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {Provider,useSelector} from "react-redux";

import ReorderPhaseMain from "components/reorder-phase-main/reorder-phase-main";

import thestore from "store/store";

import "./index.less";

type RenamePhase="reorder"|"rename";

function IndexMain():JSX.Element
{
  const theImageGroups2=useSelector<TheStore,ImageGroup[]>(s=>s.imageGroups);
  const theSelectedImages2=useSelector<TheStore,ImageData2[]>(s=>s.selectedImages);

  const [theCurrentPhase,setCurrentPhase]=useState<RenamePhase>("reorder");
  const [theImageGroups,setImageGroups]=useState<ImageGroup[]>([]);

  /** reorder phase submitted groups. switch to rename phase and load the groups. */
  function handleReorderSubmit(groups:ImageGroup[]):void
  {
    setCurrentPhase("rename");
    setImageGroups(groups);
  }

  function renderReorderPhase():JSX.Element|null
  {
    if (theCurrentPhase!="reorder")
    {
      return null;
    }

    return <ReorderPhaseMain onGroupsSubmit={handleReorderSubmit}/>;
  }

  return <>
    {renderReorderPhase()}
  </>;
}

function main()
{
  ReactDOM.render(<Provider store={thestore}><IndexMain/></Provider>,document.querySelector(".main"));
}

window.onload=main;