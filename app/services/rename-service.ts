import {ipcMain,IpcMainEvent} from "electron";

export function initRenameServiceListeners():void
{
    ipcMain.on("rename-request",(event:IpcMainEvent,arg:ImageGroup)=>{
        console.log("got something",arg);
    });
}
