// functions for working with image data alone
import _ from "lodash";
import naturalCompare from "natural-compare";

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

/** sort ImageGroup's items with natural name sort */
export function sortGroupAlpha(group:ImageGroup,reverse:boolean=false):ImageGroup
{
    group={
        ...group,
        items:group.items.sort(compareImageGroup)
    };

    if (reverse)
    {
        _.reverse(group.items);
    }

    return group;
}

/** find the first image that comes before all selected images, or the one that comes immediately after,
 * if the first image is selected. might return undefined if failed to find something that meets the
 * criteria */
export function imageBeforeSelected(images:ImageData2[],selected:ImageData2[]):ImageData2|undefined
{
    // quit if no selected
    if (!selected.length || !images.length)
    {
        return undefined;
    }

    var selectedSet:Set<ImageData2>=new Set(selected);

    var findFirst:boolean=true;

    // if the first image in the images array is selected, then find the first unselected image AFTER
    // all the selected images
    if (selectedSet.has(images[0]))
    {
        findFirst=false;
    }

    // find the first image that fulfills a condition
    return _.find(images,(x:ImageData2,i:number):boolean=>{
        // if there is no next image, failed somehow, and skip
        if (i+1>=images.length)
        {
            return false;
        }

        // if we are trying to find the first image that comes before any selected image, if the next
        // image is a selected image, we found what we are looking for. return true.
        else if (findFirst && selectedSet.has(images[i+1]))
        {
            return true;
        }

        // if we are finding the image that comes after all selected images, it must be because the first
        // image in the array is already selected. so continue until we find an image that is NOT selected.
        else if (!findFirst && !selectedSet.has(x))
        {
            return true;
        }

        return false;
    });
}

/** compare function for image data */
function compareImageGroup(a:ImageData2,b:ImageData2):number
{
    return naturalCompare(a.name,b.name);
}