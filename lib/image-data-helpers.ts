// functions for working with image data alone
import _ from "lodash";

/** given array of imagedata, find and return the next item or the previous item, or the same item
 *  if it is at the end of beginning */
export function findNextImage(data:ImageData2[],searchImage:ImageData2,next:boolean=true):ImageData2
{
    var nextIndex:number=_.findIndex(data,(x:ImageData2):boolean=>{
        return x.path==searchImage.path;
    });

    if (nextIndex<0)
    {
        console.warn("find next image unable to find next image");
        return searchImage;
    }

    if (next)
    {
        nextIndex++;
    }

    else
    {
        nextIndex--;
    }

    nextIndex=_.clamp(nextIndex,0,data.length-1);

    return data[nextIndex];
}

/** same as find next image, but just takes a path and returns the path of the next image */
export function findNextPath(data:ImageData2[],searchPath:string,next:boolean=true):string
{
    return findNextImage(
        data,
        {
            path:searchPath,
            name:""
        },
        next
    ).path;
}