// perform renaming operations

import {copyFile,rename} from "fs/promises";
import {ensureDir} from "fs-extra";
import _ from "lodash";
import {dirname} from "path";

export async function doRename(renameActions:RenameAction[]):Promise<void>
{
    await ensureRenameTargets(renameActions);
    executeRename(renameActions,true);
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