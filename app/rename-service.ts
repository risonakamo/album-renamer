import {ipcMain} from "electron";
import _ from "lodash";

import {renameGroupToRenameActions} from "../lib/rename-convert";

export function attachRenameService():void
{
    // perform rename api. do the rename given the image groups
    ipcMain.on("request-rename",(event:Electron.IpcMainEvent,args:RenameRequest)=>{
        var renameActions:RenameAction[]=_.flatMap(args.groups,(x:ImageGroup):RenameAction[]=>{
            return renameGroupToRenameActions(x,args.basepath);
        });

        console.log(renameActions);
        console.log();
    });
}