import _ from "lodash";
import {join,extname} from "path";

import {generateRename,determinePadDigits} from "./rename-rule";

/** create rename actions for all items of an ImageGroup */
export function renameGroupToRenameActions(group:ImageGroup,basepath:string):RenameAction[]
{
    var digits:number=determinePadDigits(group.imagerule,group.items.length-1);

    return _.map(group.items,(x:ImageData2,i:number):RenameAction=>{
        return {
            src:x.path,
            target:renameImage(
                x.path,
                basepath,
                group.name,
                group.imagerule,
                i,
                digits
            )
        };
    });
}

/** generate an renamed image name from various components */
function renameImage(imagePath:string,basepath:string,groupName:string,
    renameRule:string,increment:number,pad:number):string
{
    var imageExt:string=extname(imagePath);
    return join(basepath,groupName,`${generateRename(renameRule,increment,pad)}${imageExt}`);
}