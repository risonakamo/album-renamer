import {contextBridge,ipcRenderer} from "electron";

var bridgeDef:ElectronBridge={
    // send rename request to electron backend
    sendRenameRequest:(groups:ImageGroup[],basepath:string,copy:boolean):void=>{
        var request:RenameRequest={
            groups,
            basepath,
            copy
        };

        ipcRenderer.send("request-rename",request);
    },

    // send request to select basepath. return the basepath from the api.
    selectBasepath:async ():Promise<string|undefined>=>{
        return await ipcRenderer.invoke("select-basepath");
    },

    // attempt to get default basepath from api. could fail and return undefined.
    getDefaultBasepath:async ():Promise<string|undefined>=>{
        return await ipcRenderer.invoke("get-default-basepath");
    }
};

contextBridge.exposeInMainWorld("electron_bridge",bridgeDef);