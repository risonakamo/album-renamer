import {app,BrowserWindow} from "electron";
import {join} from "path";

import {attachRenameService} from "./rename-service";
import {attachDialogService} from "./dialog-service";

function main():void
{
    app.on("ready",()=>{
        var mainwindow:BrowserWindow=mainWindow();
        attachDialogService(mainwindow);
    });

    attachRenameService();
}

function mainWindow():BrowserWindow
{
    var mainwindow=new BrowserWindow({
        width:1520,
        height:890,
        minWidth:650,
        minHeight:500,
        webPreferences:{
            spellcheck:false,
            preload:join(__dirname,"bridge.js")
        },
    });

    mainwindow.loadFile("web/index.html");

    return mainwindow;
}

main();