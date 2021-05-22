// functions for manipulating ImageGroups
import _ from "lodash";

interface RemoveTargetsResult
{
    groups:ImageGroup[]
    droppointSelected:boolean
}

/** given an ordered array of ImageData to move and a single ImageData, attempts to move all selected
 *  items to the position after the selected ImageData. if the drop point image data is one of the
 *  ImageDatas queued to be moved, it will be moved as well. returns new ImageGroup array with the move */
export function dropAtTarget(droppoint:ImageData2,moveItems:ImageData2[],groups:ImageGroup[]):ImageGroup[]
{
    var droppointSelected:boolean;
    var {groups,droppointSelected}=removeTargets(droppoint,moveItems,groups);

    return _.map(groups,(x:ImageGroup):ImageGroup=>{
        return insertIntoGroup(droppoint,moveItems,x,droppointSelected);
    });
}

/** drop items into a group which may or may not exist. items to be dropped appear at the front
 *  of the group */
export function dropAtTargetGroup(dropgroup:ImageGroup,moveItems:ImageData2[],groups:ImageGroup[]):ImageGroup[]
{
    var {groups}=removeTargets(null,moveItems,groups);

    var insertedIntoGroup:boolean=false;
    groups=_.map(groups,(x:ImageGroup):ImageGroup=>{
        if (x.name!=dropgroup.name)
        {
            return x;
        }

        insertedIntoGroup=true;
        return insertIntoGroupFront(moveItems,x);
    });

    // if failed to insert into a group, add a new group
    if (!insertedIntoGroup)
    {
        groups=[
            ...groups,
            {
                name:"newgroup",
                items:moveItems
            }
        ];
    }

    return groups;
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

    var indexInc:number=1;
    if (removeDropPoint)
    {
        indexInc=0;
    }

    return {
        ...group,
        items:[
            ...group.items.slice(0,droppointIndex+indexInc),
            ...items,
            ...group.items.slice(droppointIndex+1)
        ]
    };
}

/** remove all move items from the given groups, except the droppoint, if it was one of the selected
 *  items. returns the new groups and if the drop point was determined to have been one of the selected
 *  items. give no drop point to ignore droppoint logic */
function removeTargets(droppoint:ImageData2|null,moveItems:ImageData2[],groups:ImageGroup[]):RemoveTargetsResult
{
    // set of the paths of all the items to be moved
    var movePaths:Set<string>=new Set(_.map(moveItems,(x:ImageData2):string=>{
        return x.path;
    }));

    var dropPointIsSelected:boolean=false;
    if (droppoint)
    {
        // if the droppoint is one of the selected items
        dropPointIsSelected=movePaths.has(droppoint.path);

        // remove droppoint from the movepaths so it is not deleted
        movePaths.delete(droppoint.path);
    }

    // removing all the move items from the groups
    groups=_.map(groups,(x:ImageGroup):ImageGroup=>{
        return removeFromGroup(movePaths,x);
    });

    return {
        groups,
        droppointSelected:dropPointIsSelected
    };
}

/** insert items into front of group */
function insertIntoGroupFront(items:ImageData2[],group:ImageGroup):ImageGroup
{
    return {
        ...group,
        items:[
            ...items,
            ...group.items
        ]
    };
}