interface RenameAction
{
    src:string
    target:string
}

interface TempRenamePairs
{
    toTemp:RenameAction[]
    fromTemp:RenameAction[]
}