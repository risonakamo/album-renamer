interface ElectronBridge
{
    sendRenameRequest(groups:ImageGroup[],basepath:string,copy:boolean):void
    selectBasepath():Promise<string|undefined>
    getDefaultBasepath():Promise<string|undefined>
}

interface RenameRequest
{
    groups:ImageGroup[]
    basepath:string
    copy:boolean
}