import {ipcMain} from "electron";
import _ from "lodash";
import {join} from "path";

import {renameGroupToRenameActions} from "../lib/rename-convert";
import {doRename} from "../lib/rename-action";

export function attachRenameService():void
{
    // perform rename api. do the rename given the image groups
    ipcMain.on("request-rename",(event:Electron.IpcMainEvent,args:RenameRequest)=>{
        var renameActions:RenameAction[]=_.flatMap(args.groups,(x:ImageGroup):RenameAction[]=>{
            return renameGroupToRenameActions(x,args.basepath);
        });

        doRename(renameActions,args.copy);
    });

    // return default basepath rename path. currently the userprofile/Desktop
    ipcMain.handle("get-default-basepath",():string|undefined=>{
        var userprofilepath:string|undefined=process.env["userprofile"];

        if (!userprofilepath)
        {
            return undefined;
        }

        return join(userprofilepath,"Desktop");
    });
}