import React from "react";

import ButtonTextBox from "components/button-text-box/button-text-box";

import "css/phase-layout.less";
import "./rename-phase-main.less";

interface RenamePhaseMainProps
{

}

export default function RenamePhaseMain(props:RenamePhaseMainProps):JSX.Element
{
  return <div className="rename-phase-section phase-layout">
    <section className="top-section header-zone">
      <ButtonTextBox label="BASEPATH" buttonLabel="BROWSE"/>
      <ButtonTextBox label="AUTO-RENAME" buttonLabel="APPLY" className="auto-rename"/>
    </section>

    <section className="top-section body-zone">

    </section>

    <footer className="top-section footer-zone">

    </footer>
  </div>;
}