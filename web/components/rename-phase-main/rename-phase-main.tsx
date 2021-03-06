import React,{useState,useEffect,useRef,useMemo} from "react";
import _ from "lodash";
import SimpleBar from "simplebar-react";

import ButtonTextBox from "components/button-text-box/button-text-box";
import Button84 from "components/button-84/button-84";
import RenameGroup from "components/rename-group/rename-group";
import FooterText from "components/footer-text/footer-text";
import CopyMoveModeButton from "components/copy-move-mode-button/copy-move-mode-button";

import {useImageSize,useImageSizeWheelHandler} from "hooks/useImageSize";

import {getImageCount,autorenameGroups} from "lib/image-group-helpers";
import {sendRenameRequest,selectBasepath,getDefaultBasepath} from "api/electron-bridge-api";
import {determineDuplicates,determineGroupHasNoEmptyNames} from "lib/group-verify";

import "css/phase-layout.less";
import "./rename-phase-main.less";

interface RenamePhaseMainProps
{
  groups:ImageGroup[]

  // groups were renamed. provides the modified groups array
  ongroupsRenamed?(groups:ImageGroup[]):void
  groupUpdated?(group:ImageGroup):void

  // later return details about the rename
  renameCompleted?():void

  copyMode:boolean
  onCopyModeToggle(newMode:boolean):void
}

export default function RenamePhaseMain(props:RenamePhaseMainProps):JSX.Element
{
  // set of keys of the currently selected ImageGroups
  const [theSelectedGroups,setSelectedGroups]=useState<Set<number>>(new Set());

  // value of basepath field
  const [theBasePath,setBasePath]=useState<string>("");

  // if selection drag over checkboxes is happening
  const [selectionDragInProgress,setSelectionDragInProgress]=useState<boolean>(false);

  // the whole element itself, for focusing on mount
  const phaseElement=useRef<HTMLDivElement>(null);

  const {theImageSize,imageSizeControl}=useImageSize(80,80,200,20);


  /**--- DERIVED STATE --- */
  const duplicatesGroups:Set<string>=useMemo(()=>{
    return determineDuplicates(props.groups);
  },[props.groups]);

  var groupHasNoEmptyName:boolean=useMemo(()=>{
    return determineGroupHasNoEmptyNames(props.groups);
  },[props.groups]);

  const basePathError:boolean=!theBasePath.length;
  const renameDisabled:boolean=basePathError || !!duplicatesGroups.size || !groupHasNoEmptyName;


  /**--- EFFECTS --- */
  useEffect(()=>{
    // mouse up at anytime clears selection drag.
    document.addEventListener("mouseup",()=>{
      setSelectionDragInProgress(false);
    });

    // initialise basepath field
    (async ()=>{
      var basepath:string|undefined=await getDefaultBasepath();
      if (basepath)
      {
        setBasePath(basepath);
      }
    })();

    // autofocus self
    phaseElement.current?.focus();
  },[]);

  useImageSizeWheelHandler(imageSizeControl);


  /**----- STATE CONTROL -----*/
  /** add all current groups to selected groups */
  function selectAllGroups():void
  {
    var groupids:number[]=_.map(props.groups,(x:ImageGroup):number=>{
      return x.key;
    });

    setSelectedGroups(new Set(groupids));
  }

  /** deselect all groups */
  function deselectAllGroups():void
  {
    setSelectedGroups(new Set());
  }


  /**----- HANDLERS -----*/
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
    deselectAllGroups();
  }

  /** clicked the rename button. send the rename request */
  function handleRenameButtonPress():void
  {
    if (renameDisabled)
    {
      return;
    }

    sendRenameRequest(props.groups,theBasePath,props.copyMode);
    props.renameCompleted?.();
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

  /** handle basepath browse button clicked */
  async function handleBasepathBrowse():Promise<void>
  {
    var basepath:string|undefined=await selectBasepath();

    if (basepath)
    {
      setBasePath(basepath);
    }
  }

  /** key handler. */
  function h_key(e:React.KeyboardEvent<HTMLDivElement>):void
  {
    if (document.activeElement!=e.currentTarget)
    {
      return;
    }

    if ((e.key=="a" || e.key=="A") && e.ctrlKey)
    {
      e.preventDefault();
      selectAllGroups();
    }

    else if (e.key=="Escape")
    {
      deselectAllGroups();
    }

    // ctrl enter does same as clicking rename button
    else if (e.key=="Enter" && e.ctrlKey)
    {
      handleRenameButtonPress();
    }
  }


  /**----- RENDER -----*/
  function renderGroups():JSX.Element[]
  {
    return _.map(props.groups,(x:ImageGroup,i:number):JSX.Element=>{
      var selected:boolean=theSelectedGroups.has(x.key);
      return <RenameGroup group={x} key={i} onToggleSelect={handleToggleSelection} selected={selected}
        onBlur={handleRenameGroupRename} selectionDragInProgress={selectionDragInProgress}
        errorInput={duplicatesGroups.has(x.name)} imageSize={theImageSize}/>;
    });
  }

  const imageCount:number=getImageCount(props.groups);

  var buttonHoverText:string="(ctrl+enter) Perform rename";
  if (renameDisabled)
  {
    buttonHoverText="must resolve errors before renaming";
  }

  return <div className="rename-phase-section phase-layout" onKeyDown={h_key} tabIndex={-1}
    ref={phaseElement}
  >
    <section className="top-section header-zone">
      <div className="header-zone-container inputs-zone">
        <ButtonTextBox label="BASEPATH" buttonLabel="BROWSE" className="base-path" value={theBasePath}
          onBlur={handleBasePathInputBlur} errorOnEmpty={true} onSubmit={handleBasepathBrowse}
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
      <SimpleBar className="rename-groups">
        {renderGroups()}
      </SimpleBar>
    </section>

    <footer className="top-section footer-zone">
      <div className="left section">
        <FooterText selected={theSelectedGroups.size} groupCount={props.groups.length}
          imageCount={imageCount}/>
      </div>
      <div className="right section">
        <CopyMoveModeButton copyMode={props.copyMode} onToggledCopyMode={props.onCopyModeToggle}/>
      </div>
    </footer>
  </div>;
}