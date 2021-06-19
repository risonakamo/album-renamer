// functions for dealing with dropped files

import _ from "lodash";

/** image data from dropped file list */
export function imageDataFromFileList(files:FileList):ImageData2[]
{
    var validFiles:File[]=_.filter(files,(x:File):boolean=>{
        return isValidFileType(x);
    });

    return _.map(validFiles,(x:File):ImageData2=>{
        return {
            name:x.name,
            path:x.path
        };
    });
}

/** determine if file is valid target image */
function isValidFileType(file:File):boolean
{
    switch (file.type)
    {
        case "image/jpeg":
        case "image/png":
        case "image/gif":
        return true;
    }

    return false;
}