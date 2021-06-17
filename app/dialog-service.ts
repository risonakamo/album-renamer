// dialog apis

import {ipcMain,dialog} from "electron";

export function attachDialogService(mainWindow:Electron.BrowserWindow):void
{
    // open select basepath dialog. returns to sender a string path
    ipcMain.handle("select-basepath",(e:Electron.IpcMainInvokeEvent):string|undefined=>{
        var res:string[]|undefined=dialog.showOpenDialogSync(mainWindow,{
            title:"select basepath",
            message:"hello?",
            properties:["openDirectory"]
        });

        if (res)
        {
            return res[0];
        }

        return undefined;
    });
}