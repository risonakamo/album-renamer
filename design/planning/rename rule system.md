the rename rule is a specified string. the general use case is, all targeted items will be renamed to the given name, but with somewhere in the name being an incrementing number
- would like to be able to start the incrementing number from any number
- would like to be able to place the incrementing number anywhere, although usually this will be at the end

# the rule
the rename string will have the following special characters

- `#<single digit number>` becomes the increment field, starting at the specified single digit number
- `#(multi digit number)` becomes the increment field, starting at the specified multi digit number
- `\#` becomes a regular #

a rename string without a # at all will automatically append a #1 at the end, meaning it will begin incrementing from 1

if a string fails to match any of these rules, then nothing happens essentially.

## padding auto append
of course, the incrementing number will be auto padded, for example, if there are 10 items to apply the rule to, the increment field will be 01, 02, 03, ... 10

# examples
- `amber` -> amber1, amber2, amber3
- `amber#2` - > amber2, amber3, amber4
- `am#22ner` -> am22ner, am32ner, am42ner
- `amber_\##(20)` -> amber_#20, amber_#21, amber_#22
- `amber#abc#(2` -> amber#abc#(21, amber#abc#(22, amber#abc#(23