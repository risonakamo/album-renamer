/** given a rename string that follows the design specified by rename rule system.md, return a name
 *  with the given increment */
function generateRename(rule:string,increment:number):string
{
    rule=applySingleHashRule(rule,increment);

    return rule;
}

/** use single hash rule. replaces all #<number> with that number plus the increment, except for
 *  escaped hashes */
function applySingleHashRule(rule:string,increment:number):string
{
    // match #1, #2, ect.
    // [1]: the digit that was matched
    var singleHashRuleMatch:RegExp=/(?<!\\)#(\d)/;

    while (true)
    {
        var singleMatch:RegExpMatchArray|null=rule.match(singleHashRuleMatch);

        if (!singleMatch)
        {
            return rule;
        }

        rule=rule.replace(
            singleHashRuleMatch,
            (parseInt(singleMatch[1])+increment).toString()
        );
    }
}

export function test1():void
{
    console.log(generateRename("amber2",0));
    console.log(generateRename("amber#0",1));
    console.log(generateRename("amber##2",0));
    console.log(generateRename("amber\\##5",10));
}