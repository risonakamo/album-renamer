/** represents an image that was loaded by the user */
interface ImageData2
{
    path:string
    name:string
}

/** rename group of images */
interface ImageGroup
{
    name:string
    items:ImageData2[]
}