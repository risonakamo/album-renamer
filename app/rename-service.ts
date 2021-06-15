import {ipcMain} from "electron";

export function attachRenameService():void
{
    // perform rename api. do the rename given the image groups
    ipcMain.on("do-rename",(event:Electron.IpcMainEvent,args:ImageGroup[])=>{
        console.log("got rename request");
    });
}