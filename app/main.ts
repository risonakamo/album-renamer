import {app,BrowserWindow} from "electron";
import {join} from "path";

import {attachRenameService} from "./rename-service";

function main():void
{
    app.on("ready",()=>{
        mainWindow();
    });

    attachRenameService();
}

function mainWindow():void
{
    new BrowserWindow({
        width:1520,
        height:890,
        minWidth:650,
        minHeight:500,
        webPreferences:{
            spellcheck:false,
            preload:join(__dirname,"preload.js")
        },
    }).loadFile("web/index.html");
}

main();