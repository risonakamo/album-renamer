import React,{useState,useRef,useEffect} from "react";
import cx from "classnames";
import _ from "lodash";

import MiniSquareThumbnail from "components/mini-square-thumbnail/mini-square-thumbnail";

import "./rename-group.less";

interface RenameGroupProps
{
  group:ImageGroup
}

export default function RenameGroup(props:RenameGroupProps):JSX.Element
{
  const [theGroupNameValue,setGroupNameValue]=useState<string>("");

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
    checked:false
  };

  const imageCount:number=props.group.items.length;

  return <div className="rename-group">
    <div className="checkbox-zone zone">
      <div className={cx("checkbox",checkboxClass)}>
        <img src="assets/temp_checked.png"/>
      </div>
    </div>
    <div className="entry-zone zone">
      <div>
        <input className={cx("group-name-input",groupNameInputClass)} value={theGroupNameValue}
          onChange={handleGroupNameChange} ref={mainNameInput}/>
        <div className="statuses">
          <div className="image-count">{`${imageCount} images`}</div>
          <div className="mid-arrow">➜</div>
          <input className="image-rename-rule-input" placeholder="#"/>
        </div>
      </div>
    </div>
    <div className="thumbnail-zone zone">
      {renderMiniThumbnails()}
    </div>
  </div>;
}