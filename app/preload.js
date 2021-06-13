const {contextBridge}=require("electron");

contextBridge.exposeInMainWorld("electrontest",{
    hey:()=>{
        console.log("adada")
    }
});