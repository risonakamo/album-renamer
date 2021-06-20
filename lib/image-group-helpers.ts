// functions for manipulating ImageGroups
import _ from "lodash";
import naturalCompare from "natural-compare";

import {generateRename,determinePadDigits} from "lib/rename-rule";

interface RemoveTargetsResult
{
    groups:ImageGroup[]
    droppointSelected:boolean
}

interface AddGroupResult
{
    newgroup:ImageGroup
    groups:ImageGroup[]
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
export function dropAtTargetGroup(dropgroup:ImageGroup,moveItems:ImageData2[],
    groups:ImageGroup[],back:boolean=false):ImageGroup[]
{
    var {groups}=removeTargets(null,moveItems,groups);

    var insertedIntoGroup:boolean=false;
    groups=_.map(groups,(x:ImageGroup):ImageGroup=>{
        if (x.key!=dropgroup.key)
        {
            return x;
        }

        insertedIntoGroup=true;
        return insertIntoGroupFront(moveItems,x,back);
    });

    // if failed to insert into a group, add a new group
    if (!insertedIntoGroup)
    {
        var {newgroup,groups}=addGroup(moveItems,groups);
    }

    return groups;
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

/** replace a group with another group in an array of groups by matching name, or add it
 *  if it didn't exist. */
export function replaceGroup(group:ImageGroup,groups:ImageGroup[]):ImageGroup[]
{
    var added:boolean=false;
    groups=_.map(groups,(x:ImageGroup):ImageGroup=>{
        if (x.key==group.key)
        {
            added=true;
            return group;
        }

        return x;
    });

    if (!added)
    {
        groups.push(group);
    }

    return groups;
}

/** add a new group to the array of groups. auto generates a name based on the max key encountered
 *  currently */
export function addGroup(items:ImageData2[],groups:ImageGroup[]):AddGroupResult
{
    var maxgroup:ImageGroup|undefined=_.maxBy(groups,(x:ImageGroup):number=>{
        return x.key;
    });

    var maxkey:number=0;
    if (maxgroup)
    {
        maxkey=maxgroup.key+1;
    }

    var newgroup:ImageGroup={
        name:`group${maxkey}`,
        items,
        key:maxkey,
        imagerule:""
    };

    return {
        newgroup,
        groups:[
            ...groups,
            newgroup
        ]
    };
}

/** get number of images within groups */
export function getImageCount(groups:ImageGroup[]):number
{
    return _.sumBy(groups,(x:ImageGroup):number=>{
        return x.items.length;
    });
}

/** given image groups, and the target ids of groups to be auto renamed, apply the rename rule and
 *  rename all the target groups. returns the new array of image groups */
export function autorenameGroups(groups:ImageGroup[],targetGroups:Set<number>,
    renameRule:string):ImageGroup[]
{
    var targetGroupsGroups:ImageGroup[]=_.filter(groups,(x:ImageGroup):boolean=>{
        return targetGroups.has(x.key);
    });

    var digits=determinePadDigits(renameRule,targetGroupsGroups.length-1);

    return _.map(targetGroupsGroups,(x:ImageGroup,i:number):ImageGroup=>{
        return {
            ...x,
            name:generateRename(renameRule,i,digits)
        };
    });
}

/** given 2 imagedatas and the groups that they should exist in, attempt to retrieve all the imagedatas
 *  that occur between the given 2 image datas, regardless of the order they were given in */
export function getImagesBetween(item1:ImageData2,item2:ImageData2,groups:ImageGroup[]):ImageData2[]
{
    var flattenedIData:ImageData2[]=_.flatMap(groups,(x:ImageGroup):ImageData2[]=>{
        return x.items;
    });

    var selection:ImageData2[]=[];

    var firstFound:boolean=false;
    for (var x=0;x<flattenedIData.length;x++)
    {
        var item:ImageData2=flattenedIData[x];

        // if the current item matches one of the target items...
        if (item==item1 || item==item2)
        {
            // and it hasnt yet seen one of the items yet, mark the first find
            if (!firstFound)
            {
                firstFound=true;
            }

            // if it HAS seen something before, then sees the 2nd thing. quit.
            else
            {
                selection.push(item);
                return selection;
            }
        }

        // while the first has been found, push everything onto the selection
        if (firstFound)
        {
            selection.push(item);
        }
    }

    // should never get here, should always find the 2nd item and return
    console.error("somehow got to end of getImagesBetween");
    return selection;
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

/** insert items into front of group (or not) */
function insertIntoGroupFront(items:ImageData2[],group:ImageGroup,back:boolean=false):ImageGroup
{
    if (!back)
    {
        return {
            ...group,
            items:[
                ...items,
                ...group.items
            ]
        };
    }

    else
    {
        return {
            ...group,
            items:[
                ...group.items,
                ...items
            ]
        };
    }
}

/** compare function for image data */
function compareImageGroup(a:ImageData2,b:ImageData2):number
{
    return naturalCompare(a.name,b.name);
}