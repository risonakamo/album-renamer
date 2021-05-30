# use case of previous program in regard to naming groups
- multiple images are dragged in, and a number is incremented, while keeping the preceding path the same

# design points
primary use case to handle is this. we have a lot of groups, and now we need to give them names. some sets of groups will have an auto generated name, which may be prefixed or possibly even suffixed with something

# things to support
- base path should be typable and does not need to exist
    - button to open file explorer to select path, but this doesnt get used much in the previous program, but, just makes sense to have it so should have it
- group titles should easily be editable
- auto assign name to selected groups
    - perhaps it is button, when clicked opens dialog box to add a prefix
        - maybe a smaller button to do the prefix mode, or dropdown button on the button
    - maybe later can enhance it to be just auto gen string, like "prefix\<num\>"
        - but the most common use case is definitely going to be just the number on its own, so this option should not intrude on the usual workflow
- small button on group rows to edit the image gen prefix string
    - might be same case where can edit the whole auto gen string
    - maybe reuse the same dialog box as group name auto gen?
        - or have it be inline. but might use the dialog box just to make the dialog box be more centralised/stand out
- should show the contents of the group as small thumbnails, in a single row
    - could either do somewhat large thumbnails, or pretty small thumbnails which get larger on hover over
        - depends on if it is actually important to do hover over. lets start first by seeing how large "large" actually is, perhaps decent amount of rows can actually fit even with somewhat large rows
    - probably have an overlay+disappearing scrollbar to scroll back and forth, just in case thats needed
        - could do overflow hidden before this is implemented (unless overlay scrollbar is easy)
- button to go back to rename phase
    - should change all group names unless this is hard
    - should remember prefixes?
    - this will definitely be important at some point because it will be annoying if made a mistake...possibly. so might not be too important to implement yet until a case appears
- perform rename button
- somewhere for errors to appear. possibly under the rename button when it is clicked