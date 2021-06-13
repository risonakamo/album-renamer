import {app,BrowserWindow} from "electron";

import {initRenameServiceListeners} from "./services/rename-service";

function main():void
{
    app.on("ready",()=>{
        mainWindow();
    });

    initRenameServiceListeners();
}

function mainWindow():void
{
    new BrowserWindow({
        width:1520,
        height:890,
        minWidth:650,
        minHeight:500,
        webPreferences:{
            spellcheck:false
        },
    }).loadFile("web/index.html");
}

main();