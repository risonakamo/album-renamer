import React,{useState,useRef,useEffect} from "react";
import cx,{Mapping} from "classnames";
import _ from "lodash";
import SimpleBar from "simplebar-react";

import MiniSquareThumbnail from "components/mini-square-thumbnail/mini-square-thumbnail";

import "./rename-group.less";
import "simplebar/dist/simplebar.css";

interface RenameGroupProps
{
  group:ImageGroup
  selected?:boolean
  selectionDragInProgress?:boolean
  errorInput?:boolean
  imageSize:number

  onToggleSelect?(selected:boolean,group:ImageGroup):void
  onBlur?(group:ImageGroup):void
}

export default function RenameGroup(props:RenameGroupProps):JSX.Element
{
  const [theGroupNameValue,setGroupNameValue]=useState<string>("");
  const [theImageRuleValue,setImageRuleValue]=useState<string>("");
  const [groupNameEditedOverride,setGroupNameEdited]=useState<boolean>(false);
  const [inputFocused,setInputFocused]=useState<boolean>(false);

  const mainNameInput=useRef<HTMLInputElement>(null);

  // initialise entry to given name from props
  useEffect(()=>{
    setGroupNameValue(props.group.name);
  },[props.group.name]);

  /** update current group name state. */
  function handleGroupNameChange(e:React.ChangeEvent<HTMLInputElement>):void
  {
    setGroupNameValue(e.currentTarget.value);
    setGroupNameEdited(true);
  }

  /** trigger selection toggle. returns opposite of the current selection state. */
  function handleCheckboxClick():void
  {
    props.onToggleSelect?.(!props.selected,props.group);
  }

  /** handle mouse entered the checkbox zone while mouse1 is pressed and a selection drag is in
   *  progress. */
  function handleCheckboxMouseIn(e:React.MouseEvent):void
  {
    if (props.selectionDragInProgress && e.buttons==1)
    {
      props.onToggleSelect?.(!props.selected,props.group);
    }
  }

  /** keyboard handlers for input. unfocuses on enter button. shared with rename rule input */
  function handleGroupNameEnter(e:React.KeyboardEvent):void
  {
    if (e.key=="Enter")
    {
      e.preventDefault();
      (e.currentTarget as HTMLElement).blur();
      setGroupNameEdited(true);
    }
  }

  /** submit group change. also shared with image rule field. also unset input focus state */
  function handleGroupNameBlur():void
  {
    props.onBlur?.({
      ...props.group,
      name:theGroupNameValue.trim(),
      imagerule:theImageRuleValue
    });

    setInputFocused(false);
  }

  /** set image rule state value */
  function handleImageRuleInputChange(e:React.ChangeEvent<HTMLInputElement>):void
  {
    setImageRuleValue(e.currentTarget.value);
  }

  /** input focused. set input focus state */
  function h_inputFocus():void
  {
    setInputFocused(true);
  }


  /** --- RENDER --- */
  function renderMiniThumbnails():JSX.Element[]
  {
    return _.map(props.group.items,(x:ImageData2,i:number):JSX.Element=>{
      return <MiniSquareThumbnail image={x.path} key={i} size={props.imageSize}/>;
    });
  }

  // row counts as in "renamed" state, only if not in error state
  const renamed:boolean=(props.group.renamed || groupNameEditedOverride) && !props.errorInput;

  // top level "renamed" state. only applicable if input NOT focused
  const topRenamed:boolean=renamed && !inputFocused;

  const imageCount:number=props.group.items.length;

  const groupNameInputClass:Mapping={
    empty:!theGroupNameValue.length,
    error:props.errorInput,
    renamed
  };

  const checkboxClass:Mapping={
    checked:props.selected
  };

  const topClass:Mapping={
    renamed:topRenamed
  };

  const topStyle:React.CSSProperties={
    height:`${props.imageSize}px`
  };

  return <div className={cx("rename-group",topClass)} style={topStyle}>
    <div className="checkbox-zone zone" onMouseDown={handleCheckboxClick}
      onMouseEnter={handleCheckboxMouseIn}
    >
      <div className={cx("checkbox",checkboxClass)}>
        <img src="assets/temp_checked.png"/>
      </div>
    </div>
    <div className="entry-zone zone">
      <div>
        <input className={cx("group-name-input",groupNameInputClass)} value={theGroupNameValue}
          onChange={handleGroupNameChange} ref={mainNameInput} onKeyDown={handleGroupNameEnter}
          onBlur={handleGroupNameBlur} onFocus={h_inputFocus}/>
        <div className="statuses">
          <div className="image-count">{`${imageCount} images`}</div>
          <div className="mid-arrow">➜</div>
          <input className="image-rename-rule-input" placeholder="#" tabIndex={-1}
            onKeyDown={handleGroupNameEnter} onChange={handleImageRuleInputChange}
            onBlur={handleGroupNameBlur} value={theImageRuleValue} onFocus={h_inputFocus}/>
        </div>
      </div>
    </div>
    <SimpleBar className="thumbnail-zone zone">
      {renderMiniThumbnails()}
    </SimpleBar>
  </div>;
}