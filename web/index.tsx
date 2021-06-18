import React,{useState} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {Provider,useSelector} from "react-redux";

import ReorderPhaseMain from "components/reorder-phase-main/reorder-phase-main";
import RenamePhaseMain from "components/rename-phase-main/rename-phase-main";

import thestore from "store/store";

import {useImageGroups} from "hooks/useImageGroups";

import "./index.less";

type RenamePhase="reorder"|"rename";

function IndexMain():JSX.Element
{
  const theImageGroups2=useSelector<TheStore,ImageGroup[]>(s=>s.imageGroups);
  const theSelectedImages2=useSelector<TheStore,ImageData2[]>(s=>s.selectedImages);

  const [theCurrentPhase,setCurrentPhase]=useState<RenamePhase>("reorder");
  const {theImageGroups,imageGroupControl}=useImageGroups([]);

  /** reorder phase submitted groups. switch to rename phase and load the groups. */
  function handleReorderSubmit(groups:ImageGroup[]):void
  {
    setCurrentPhase("rename");
    imageGroupControl.setImageGroups(groups);
  }

  /** groups were renamed. override the groups */
  function handleGroupsRenamed(groups:ImageGroup[]):void
  {
    imageGroupControl.setImageGroups(groups);
  }

  /** image group updated. call replace group */
  function handleGroupUpdate(group:ImageGroup):void
  {
    imageGroupControl.doReplaceGroup(group);
  }

  /** rename performed. reset to initial */
  function handleRenameCompleted():void
  {
    setCurrentPhase("reorder");
    imageGroupControl.setImageGroups([]);
  }

  function renderReorderPhase():JSX.Element|null
  {
    if (theCurrentPhase!="reorder")
    {
      return null;
    }

    return <ReorderPhaseMain onGroupsSubmit={handleReorderSubmit}/>;
  }

  function renderRenamePhase():JSX.Element|null
  {
    if (theCurrentPhase!="rename")
    {
      return null;
    }

    return <RenamePhaseMain groups={theImageGroups} ongroupsRenamed={handleGroupsRenamed}
      groupUpdated={handleGroupUpdate} renameCompleted={handleRenameCompleted}/>;
  }

  return <>
    {renderReorderPhase()}
    {renderRenamePhase()}
  </>;
}

function main()
{
  ReactDOM.render(<Provider store={thestore}><IndexMain/></Provider>,document.querySelector(".main"));
}

window.onload=main;