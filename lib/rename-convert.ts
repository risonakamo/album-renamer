import _ from "lodash";
import {join,extname} from "path";

import {generateRename} from "./rename-rule";

/** create rename actions for all items of an ImageGroup */
export function renameGroupToRenameActions(group:ImageGroup,basepath:string):RenameAction[]
{
    return _.map(group.items,(x:ImageData2,i:number):RenameAction=>{
        return {
            src:x.path,
            target:renameImage(
                x.path,
                basepath,
                group.name,
                group.imagerule,
                i
            )
        };
    });
}

/** generate an renamed image name from various components */
function renameImage(imagePath:string,basepath:string,groupName:string,
    renameRule:string,increment:number):string
{
    var imageExt:string=extname(imagePath);
    return join(basepath,groupName,`${generateRename(renameRule,increment)}${imageExt}`);
}