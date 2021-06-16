import React,{useState,useEffect} from "react";
import _ from "lodash";

import ButtonTextBox from "components/button-text-box/button-text-box";
import Button84 from "components/button-84/button-84";
import RenameGroup from "components/rename-group/rename-group";
import FooterText from "components/footer-text/footer-text";

import {getImageCount,autorenameGroups} from "lib/image-group-helpers";
import {sendRenameRequest} from "api/electron-bridge-api";
import {determineDuplicates} from "lib/group-verify";

import "css/phase-layout.less";
import "./rename-phase-main.less";

interface RenamePhaseMainProps
{
  groups:ImageGroup[]

  // groups were renamed. provides the modified groups array
  ongroupsRenamed?(groups:ImageGroup[]):void
  groupUpdated?(group:ImageGroup):void
}

export default function RenamePhaseMain(props:RenamePhaseMainProps):JSX.Element
{
  // set of keys of the currently selected ImageGroups
  const [theSelectedGroups,setSelectedGroups]=useState<Set<number>>(new Set());
  const [theBasePath,setBasePath]=useState<string>("");
  const [selectionDragInProgress,setSelectionDragInProgress]=useState<boolean>(false);

  useEffect(()=>{
    // mouse up at anytime clears selection drag.
    document.addEventListener("mouseup",()=>{
      setSelectionDragInProgress(false);
    });
  },[]);

  /** group selection was toggled. also set the selection drag state to be true. unsets on mouseup
   *  at any time. */
  function handleToggleSelection(selected:boolean,group:ImageGroup):void
  {
    setSelectionDragInProgress(true);

    var selectedGroups2:Set<number>=new Set(theSelectedGroups);
    if (!selected)
    {
      selectedGroups2.delete(group.key);
    }

    else
    {
      selectedGroups2.add(group.key);
    }

    setSelectedGroups(selectedGroups2);
  }

  /** perform auto rename. deselects all */
  function handleAutoRenameButton(value:string):void
  {
    props.ongroupsRenamed?.(autorenameGroups(props.groups,theSelectedGroups,value));
    setSelectedGroups(new Set());
  }

  // todo: testing
  function handleRenameButtonPress():void
  {
    sendRenameRequest(props.groups,theBasePath);
  }

  /** rename group input did update. update the group it is providing */
  function handleRenameGroupRename(group:ImageGroup):void
  {
    props.groupUpdated?.(group);
  }

  /** base path input blurred. save the value */
  function handleBasePathInputBlur(value:string):void
  {
    setBasePath(value);
  }

  const duplicatesGroups:Set<string>=determineDuplicates(props.groups);

  function renderGroups():JSX.Element[]
  {
    return _.map(props.groups,(x:ImageGroup,i:number):JSX.Element=>{
      var selected:boolean=theSelectedGroups.has(x.key);
      return <RenameGroup group={x} key={i} onToggleSelect={handleToggleSelection} selected={selected}
        onBlur={handleRenameGroupRename} selectionDragInProgress={selectionDragInProgress}
        errorInput={duplicatesGroups.has(x.name)}/>;
    });
  }

  const basePathError:boolean=!theBasePath.length;
  const imageCount:number=getImageCount(props.groups);

  const renameDisabled:boolean=basePathError || !!duplicatesGroups.size;

  var buttonHoverText:string|undefined;
  if (renameDisabled)
  {
    buttonHoverText="must resolve errors before renaming";
  }

  return <div className="rename-phase-section phase-layout">
    <section className="top-section header-zone">
      <div className="header-zone-container inputs-zone">
        <ButtonTextBox label="BASEPATH" buttonLabel="BROWSE" className="base-path"
          onBlur={handleBasePathInputBlur} errorOnEmpty={true}
          errorLabel="value cannot be empty"/>
        <ButtonTextBox label="AUTO-RENAME" buttonLabel="APPLY" className="auto-rename"
          onSubmit={handleAutoRenameButton} autoClear={true}/>
        <div className="empty"></div>
      </div>
      <div className="rename-button-zone header-zone-container">
        <Button84 icon="assets/temp_do-rename.png" onClick={handleRenameButtonPress}
          disabled={renameDisabled} hoverText={buttonHoverText}/>
      </div>
    </section>

    <section className="top-section body-zone">
      <div className="rename-groups">
        {renderGroups()}
      </div>
    </section>

    <footer className="top-section footer-zone">
      <FooterText selected={theSelectedGroups.size} groupCount={props.groups.length}
        imageCount={imageCount}/>
    </footer>
  </div>;
}