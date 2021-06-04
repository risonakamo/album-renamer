import React,{useState} from "react";
import cx from "classnames";

import "./rename-group.less";

interface RenameGroupProps
{

}

export default function RenameGroup(props:RenameGroupProps):JSX.Element
{
  const [theGroupNameValue,setGroupNameValue]=useState<string>("");

  /** update current group name state. */
  function handleGroupNameChange(e:React.ChangeEvent<HTMLInputElement>):void
  {
    setGroupNameValue(e.currentTarget.value);
  }

  const groupNameInputClass={
    empty:!theGroupNameValue.length
  };

  const checkboxClass={
    checked:false
  };

  return <div className="rename-group">
    <div className="checkbox-zone zone">
      <div className={cx("checkbox",checkboxClass)}>
        <img src="assets/temp_checked.png"/>
      </div>
    </div>
    <div className="entry-zone zone">
      <input className={cx("group-name-input",groupNameInputClass)} value={theGroupNameValue}
        onChange={handleGroupNameChange}/>
      <div className="statuses">
        <div className="image-count">3 images</div>
      </div>
    </div>
    <div className="thumbnail-zone zone">

    </div>
  </div>;
}