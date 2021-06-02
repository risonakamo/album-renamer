import React from "react";

import ButtonTextBox from "components/button-text-box/button-text-box";
import Button84 from "components/button-84/button-84";

import "css/phase-layout.less";
import "./rename-phase-main.less";

interface RenamePhaseMainProps
{

}

export default function RenamePhaseMain(props:RenamePhaseMainProps):JSX.Element
{
  return <div className="rename-phase-section phase-layout">
    <section className="top-section header-zone">
      <div className="header-zone-container">
        <ButtonTextBox label="BASEPATH" buttonLabel="BROWSE"/>
        <ButtonTextBox label="AUTO-RENAME" buttonLabel="APPLY" className="auto-rename"/>
      </div>
      <div className="rename-button-zone header-zone-container">
        <Button84/>
      </div>
    </section>

    <section className="top-section body-zone">

    </section>

    <footer className="top-section footer-zone">

    </footer>
  </div>;
}