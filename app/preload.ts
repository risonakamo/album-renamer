import {contextBridge,ipcRenderer} from "electron";

contextBridge.exposeInMainWorld("electron",{
    // send request to electron renameservice to rename
    doRename:(groups:ImageGroup[])=>{
        ipcRenderer.send("do-rename",groups);
    }
});