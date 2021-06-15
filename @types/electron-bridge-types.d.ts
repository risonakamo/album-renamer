interface ElectronBridge
{
    sendRenameRequest(groups:ImageGroup[],basepath:string):void
}

interface RenameRequest
{
    groups:ImageGroup[]
    basepath:string
}