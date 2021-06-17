import {contextBridge,ipcRenderer} from "electron";

contextBridge.exposeInMainWorld("electron_bridge",{
    // send rename request to electron backend
    sendRenameRequest:(groups:ImageGroup[],basepath:string):void=>{
        ipcRenderer.send("request-rename",{
            groups,
            basepath
        } as RenameRequest);
    },

    // send request to select basepath. return the basepath from the api.
    selectBasepath:async ():Promise<string|undefined>=>{
        return await ipcRenderer.invoke("select-basepath");
    },

    // attempt to get default basepath from api. could fail and return undefined.
    getDefaultBasepath:async ():Promise<string|undefined>=>{
        return await ipcRenderer.invoke("get-default-basepath");
    }
} as ElectronBridge);