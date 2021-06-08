import React from "react";
import _ from "lodash";

import ButtonTextBox from "components/button-text-box/button-text-box";
import Button84 from "components/button-84/button-84";
import RenameGroup from "components/rename-group/rename-group";

import "css/phase-layout.less";
import "./rename-phase-main.less";

interface RenamePhaseMainProps
{
  groups:ImageGroup[]
}

export default function RenamePhaseMain(props:RenamePhaseMainProps):JSX.Element
{
  function renderGroups():JSX.Element[]
  {
    return _.map(props.groups,(x:ImageGroup,i:number):JSX.Element=>{
      return <RenameGroup group={x} key={i}/>;
    });
  }

  return <div className="rename-phase-section phase-layout">
    <section className="top-section header-zone">
      <div className="header-zone-container inputs-zone">
        <ButtonTextBox label="BASEPATH" buttonLabel="BROWSE" className="base-path"/>
        <ButtonTextBox label="AUTO-RENAME" buttonLabel="APPLY" className="auto-rename"/>
        <div className="empty"></div>
      </div>
      <div className="rename-button-zone header-zone-container">
        <Button84 icon="assets/temp_do-rename.png"/>
      </div>
    </section>

    <section className="top-section body-zone">
      <div className="checkbox-border"></div>
      <div className="rename-groups">
        {renderGroups()}
      </div>
    </section>

    <footer className="top-section footer-zone">

    </footer>
  </div>;
}