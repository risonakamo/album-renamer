import React from "react";

import ButtonTextBox from "components/button-text-box/button-text-box";
import Button84 from "components/button-84/button-84";
import RenameGroup from "components/rename-group/rename-group";

import "css/phase-layout.less";
import "./rename-phase-main.less";

interface RenamePhaseMainProps
{

}

export default function RenamePhaseMain(props:RenamePhaseMainProps):JSX.Element
{
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
      <div className="rename-groups">
        <RenameGroup/>
      </div>
    </section>

    <footer className="top-section footer-zone">

    </footer>
  </div>;
}