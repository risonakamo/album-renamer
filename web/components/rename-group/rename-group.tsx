import React,{useState,useRef,useEffect} from "react";
import cx from "classnames";
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

  onToggleSelect?(selected:boolean,group:ImageGroup):void
  onBlur?(group:ImageGroup):void
}

export default function RenameGroup(props:RenameGroupProps):JSX.Element
{
  const [theGroupNameValue,setGroupNameValue]=useState<string>("");
  const [theImageRuleValue,setImageRuleValue]=useState<string>("");

  const mainNameInput=useRef<HTMLInputElement>(null);

  // initialise entry to given name from props
  useEffect(()=>{
    setGroupNameValue(props.group.name);
  },[props.group.name]);

  /** update current group name state. */
  function handleGroupNameChange(e:React.ChangeEvent<HTMLInputElement>):void
  {
    setGroupNameValue(e.currentTarget.value);
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
    }
  }

  /** submit group change */
  function handleGroupNameBlur():void
  {
    props.onBlur?.({
      ...props.group,
      name:theGroupNameValue,
      imagerule:theImageRuleValue
    });
  }

  /** set image rule state value */
  function handleImageRuleInputChange(e:React.ChangeEvent<HTMLInputElement>):void
  {
    setImageRuleValue(e.currentTarget.value);
  }

  function renderMiniThumbnails():JSX.Element[]
  {
    return _.map(props.group.items,(x:ImageData2,i:number):JSX.Element=>{
      return <MiniSquareThumbnail image={x.path} key={i}/>;
    });
  }

  const groupNameInputClass={
    empty:!theGroupNameValue.length
  };

  const checkboxClass={
    checked:props.selected
  };

  const imageCount:number=props.group.items.length;

  return <div className="rename-group">
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
          onBlur={handleGroupNameBlur}/>
        <div className="statuses">
          <div className="image-count">{`${imageCount} images`}</div>
          <div className="mid-arrow">➜</div>
          <input className="image-rename-rule-input" placeholder="#" tabIndex={-1}
            onKeyDown={handleGroupNameEnter} onChange={handleImageRuleInputChange}/>
        </div>
      </div>
    </div>
    <SimpleBar className="thumbnail-zone zone">
      {renderMiniThumbnails()}
    </SimpleBar>
  </div>;
}