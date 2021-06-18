// perform renaming operations

import {copyFile,rename} from "fs/promises";
import {ensureDir} from "fs-extra";
import _ from "lodash";
import {dirname,join} from "path";
import {dirSync} from "tmp";

/** perform the rename action, moving or copying all rename action src to targets, creating
 *  file structure as needed. */
export async function doRename(renameActions:RenameAction[],copy:boolean):Promise<void>
{
    await ensureRenameTargets(renameActions);
    var {toTemp,fromTemp}=generateTempActions(renameActions);

    await executeRename(toTemp,copy);
    await executeRename(fromTemp,copy);
}

/** carry out a rename action, potentially copying if copy flag is set */
function executeRename(actions:RenameAction[],copy:boolean):void
{
    for (var x=0;x<actions.length;x++)
    {
        if (copy)
        {
            copyFile(actions[x].src,actions[x].target);
        }

        else
        {
            rename(actions[x].src,actions[x].target);
        }
    }
}

/** ensure the target folder paths of all rename targets exists */
async function ensureRenameTargets(actions:RenameAction[]):Promise<void[]>
{
    return await Promise.all(_.map(actions,(x:RenameAction):Promise<void>=>{
        return ensureDir(dirname(x.target));
    }));
}

/** convert rename actions into 2 arrays of rename actions. one set of rename actions, when executed
 *  will move all original target items into a temporary directory with unique names. the other set,
 *  when execute, will move all the temporary items to their original intended locations. by executing
 *  them sequentially, it is possible to move/copy items without overridding themselves. */
function generateTempActions(actions:RenameAction[]):TempRenamePairs
{
    var tmpDir:string=dirSync().name;

    return _.reduce(actions,(r:TempRenamePairs,x:RenameAction,i:number):TempRenamePairs=>{
        var tmpName:string=join(tmpDir,i.toString());

        r.toTemp.push({
            src:x.src,
            target:tmpName
        });

        r.fromTemp.push({
            src:tmpName,
            target:x.target
        });

        return r;
    },{
        toTemp:[],
        fromTemp:[]
    });
}