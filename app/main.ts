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
        width:800,
        height:600
    }).loadFile("web/index.html");
}

main();