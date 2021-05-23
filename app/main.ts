import {app,BrowserWindow} from "electron";

function main():void
{
    app.on("ready",()=>{
        mainWindow();
    });
}

function mainWindow():void
{
    new BrowserWindow({
        width:1520,
        height:890,
        webPreferences:{
            spellcheck:false
        }
    }).loadFile("web/index.html");
}

main();