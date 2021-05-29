// image group state control
import {useState} from "react";

import {dropAtTarget,dropAtTargetGroup,replaceGroup,
    addGroup,getImageCount} from "lib/image-group-helpers";

export function useImageGroups(initialData:ImageGroup[])
{
    const [theImageGroups,setImageGroups]=useState<ImageGroup[]>(initialData);

    /** given items, move the items to be behind the target item, in the order they were given */
    function moveItemsBehindItem(items:ImageData2[],target:ImageData2):void
    {
        setImageGroups(dropAtTarget(
            target,
            items,
            theImageGroups
        ));
    }

    /** move items into front of target group. give back to place in back of group. */
    function moveItemsToGroup(items:ImageData2[],group:ImageGroup,back:boolean=false):void
    {
        setImageGroups(dropAtTargetGroup(
            group,
            items,
            theImageGroups,
            back
        ));
    }

    /** update a group */
    function doReplaceGroup(group:ImageGroup):void
    {
        setImageGroups(replaceGroup(group,theImageGroups));
    }

    /** add an empty group */
    function addEmptyGroup():void
    {
        setImageGroups(addGroup(
            [],
            theImageGroups
        ).groups);
    }

    /** create a new group with the given items */
    function addGroupWithItems(items:ImageData2[]):void
    {
        var newgroup:ImageGroup;
        var newgroups:ImageGroup[];
        var {newgroup,groups:newgroups}=addGroup(
          items,
          theImageGroups
        );

        setImageGroups(newgroups);
        moveItemsToGroup(items,newgroup);
    }

    return {
        theImageGroups,
        imageGroupControl:{
            moveItemsBehindItem,
            moveItemsToGroup,
            doReplaceGroup,
            addEmptyGroup,
            addGroupWithItems
        }
    }
}