// functions for verifying things about image groups

import _ from "lodash";

/** given an array of image groups, return a set of names of groups that are duplicates */
export function determineDuplicates(groups:ImageGroup[]):Set<string>
{
    var seenNames:Set<string>=new Set();
    var dupeNames:Set<string>=new Set();

    for (var x=0;x<groups.length;x++)
    {
        var name:string=groups[x].name;
        if (seenNames.has(name))
        {
            dupeNames.add(name);
        }

        seenNames.add(name);
    }

    return dupeNames;
}

/** return if all groups have a non empty name */
export function determineGroupHasNoEmptyNames(groups:ImageGroup[]):boolean
{
    return _.every(groups,(x:ImageGroup):boolean=>{
        return !!x.name.length;
    });
}