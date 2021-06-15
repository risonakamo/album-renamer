import {contextBridge,ipcRenderer} from "electron";

contextBridge.exposeInMainWorld("electron_bridge",{
    // send rename request to electron backend
    sendRenameRequest:(groups:ImageGroup[],basepath:string):void=>{
        ipcRenderer.send("request-rename",{
            groups,
            basepath
        } as RenameRequest);
    }
} as ElectronBridge);