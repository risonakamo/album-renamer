import _ from "lodash";
import {join,extname} from "path";

import {generateRename} from "lib/rename-rule";

/** create rename actions for all items of an ImageGroup */
export function renameGroupToRenameActions(group:ImageGroup,basepath:string,imageRule:string):RenameAction[]
{
    // return _.map(group.items,(x:ImageData2):RenameAction=>{
    //     return {
    //         src:x.path,
    //         target
    //     };
    // });

    for (var x=0;x<group.items.length;x++)
    {
        var a=renameImage(
            group.items[x].path,
            basepath,
            group.name,
            imageRule,
            x
        );

        console.log(a);
    }

    return [];
}

/** generate an renamed image name from various components */
function renameImage(imagePath:string,basepath:string,groupName:string,
    renameRule:string,increment:number):string
{
    var imageExt:string=extname(imagePath);
    return join(basepath,groupName,`${generateRename(renameRule,increment)}${imageExt}`);
}