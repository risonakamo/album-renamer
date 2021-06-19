// match #1, #2, ect.
// [1]: the digit that was matched
const _singleHashRuleMatch:RegExp=/(?<!\\)#(\d)/;

// match #(2), #(10), ect.
// [1]: the number that was matched
var _parenHashRuleMatch:RegExp=/(?<!\\)#\((\d+)\)/;

/** given a rename string that follows the design specified by rename rule system.md, return a name
 *  with the given increment */
export function generateRename(rule:string,increment:number,pad:number):string
{
    var appliedARule:boolean=false;
    var {result,applied}=applyParenHashRule(rule,increment,pad);
    appliedARule=appliedARule||applied;

    var {result,applied}=applySingleHashRule(result,increment,pad);
    appliedARule=appliedARule||applied;

    if (!appliedARule)
    {
        var appendIncrement:string=(increment+1).toString().padStart(pad,"0");
        result+=appendIncrement;
    }

    return applyEscapeHashRule(result);
}

/** for a given rename rule, determine the number of digits the numeric component of the
 *  rename is going to be */
export function determinePadDigits(rule:string,increment:number):number
{
    var maxDigits:number=increment.toString().length;

    var singleMatch:RegExpMatchArray|null=rule.match(_singleHashRuleMatch);

    if (singleMatch && singleMatch.length==2)
    {
        maxDigits=Math.max(maxDigits,(parseInt(singleMatch[1])+increment).toString().length);
    }

    var parenMatch:RegExpMatchArray|null=rule.match(_parenHashRuleMatch);

    if (parenMatch && parenMatch.length==2)
    {
        maxDigits=Math.max(maxDigits,(parseInt(parenMatch[1])+increment).toString().length);
    }

    return maxDigits;
}

/** use single hash rule. replaces all #<number> with that number plus the increment, except for
 *  escaped hashes */
function applySingleHashRule(rule:string,increment:number,pad:number):RenameRuleApplyResult
{
    var applied:boolean=false;

    while (true)
    {
        var singleMatch:RegExpMatchArray|null=rule.match(_singleHashRuleMatch);

        if (!singleMatch)
        {
            return {
                result:rule,
                applied
            };
        }

        applied=true;
        rule=rule.replace(
            _singleHashRuleMatch,
            (parseInt(singleMatch[1])+increment).toString().padStart(pad,"0")
        );
    }
}

/** apply paren hash rule, replace all #(<number), where number can be multidigit, with the number
 *  plus the increment. */
function applyParenHashRule(rule:string,increment:number,pad:number):RenameRuleApplyResult
{
    var applied:boolean=false;

    while (true)
    {
        var match:RegExpMatchArray|null=rule.match(_parenHashRuleMatch);

        if (!match)
        {
            return {
                result:rule,
                applied
            };
        }

        applied=true;
        rule=rule.replace(
            _parenHashRuleMatch,
            (parseInt(match[1])+increment).toString().padStart(pad,"0")
        );
    }
}

/** escape hashes */
function applyEscapeHashRule(rule:string):string
{
    return rule.replace(/\\#/g,"#");
}

export function test1():void
{
    console.log(generateRename("amber2_",0,1));
    console.log(generateRename("amber#0",1,1));
    console.log(generateRename("amber##2",0,1));
    console.log(generateRename("amber\\##5",10,1));
    console.log(generateRename("amber\\##5#(20)",10,1));
    console.log(generateRename("amber\\##5#(20a",10,1));
    console.log(generateRename("amber\\##5#(20a)",10,1));
    console.log(generateRename("amber\\##5#(#20a)",10,1));
    console.log(generateRename("#(14).png",1,1));
}