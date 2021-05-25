interface TheStore
{
    imageGroups:ImageGroup[]
    selectedImages:ImageData2[]
}

interface DropAtTargetPayload
{
    droptarget:ImageData2
    items:ImageData2[]
    clearSelection:boolean
}

interface DropAtTargetGroupPayload
{
    dropgroup:ImageGroup
    items:ImageData2[]
    clearSelection:boolean
}