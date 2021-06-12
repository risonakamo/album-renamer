import {ipcMain} from "electron";

export function initRenameServiceListeners():void
{
    ipcMain.on("rename-request",(event,arg:ImageGroup)=>{

    });
}
