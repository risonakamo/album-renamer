interface ElectronBridge
{
    sendRenameRequest(groups:ImageGroup[],basepath:string):void
    selectBasepath():Promise<string|undefined>
}

interface RenameRequest
{
    groups:ImageGroup[]
    basepath:string
}