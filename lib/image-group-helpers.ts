// functions for manipulating ImageGroups
import _ from "lodash";

/** given an ordered array of ImageData to move and a single ImageData, attempts to move all selected
 *  items to the position after the selected ImageData. if the drop point image data is one of the
 *  ImageDatas queued to be moved, it will be moved as well. returns new ImageGroup array with the move */
export function dropAtTarget(droppoint:ImageData2,moveItems:ImageData2[],groups:ImageGroup[]):ImageGroup[]
{
    // set of the paths of all the items to be moved
    var movePaths:Set<string>=new Set(_.map(moveItems,(x:ImageData2):string=>{
        return x.path;
    }));

    // if the droppoint is one of the selected items
    var dropPointIsSelected:boolean=movePaths.has(droppoint.path);

    // remove droppoint from the movepaths so it is not deleted
    movePaths.delete(droppoint.path);

    // removing all the move items from the groups
    groups=_.map(groups,(x:ImageGroup):ImageGroup=>{
        return removeFromGroup(movePaths,x);
    });

    return _.map(groups,(x:ImageGroup):ImageGroup=>{
        return insertIntoGroup(droppoint,moveItems,x,dropPointIsSelected);
    });
}

/** given a set of items's paths, removes them from the target group. returns the group with them removed */
function removeFromGroup(removeItemsPaths:Set<string>,group:ImageGroup):ImageGroup
{
    return {
        ...group,
        items:_.reject(group.items,(x:ImageData2):boolean=>{
            return removeItemsPaths.has(x.path)
        })
    };
}

/** insert the items after the droppoint, if the droppoint is even in the group. remove the droppoint
 *  if specified. */
function insertIntoGroup(droppoint:ImageData2,items:ImageData2[],
    group:ImageGroup,removeDropPoint:boolean):ImageGroup
{
    var droppointIndex:number=_.findIndex(group.items,(x:ImageData2):boolean=>{
        return x.path==droppoint.path;
    });

    if (droppointIndex<0)
    {
        return group;
    }

    if (!removeDropPoint)
    {
        droppointIndex++;
    }

    return {
        ...group,
        items:[
            ...group.items.slice(0,droppointIndex),
            ...items,
            ...group.items.slice(droppointIndex+1)
        ]
    };
}