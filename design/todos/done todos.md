# ~~next steps~~ (COMPLETE) (TRACKED WITH ISSUES)
- dropping into a group
- dropping to make a new group
- have drag arrow appear on drop target
- selection order numbers
- editable group name
    - debounce save/re-render?
- group name sort button
- deselect all button
    - esc on keyboard
- group needs to have some sort of key since name can now be changed
- drag into area to create group from dragged items

# ~~next steps 2~~ (COMPLETED) (TRACKING WITH ISSUES)
- make title area taller so easier to drag things into
    - padding for group titles seems tight
- move image group state manipulation into custom hook or use redux
- increase spacing between image rows
- preload the group name
    - group name is editable but needs to be set from props at least when it is first created
- things break when dragging incorrect things and dropping them
- make status area
    - have status area show number selected

# ~~next steps 3~~ (issue tracked)
- border around image group when dragging over files
    - normal drag borders should not appear
- drag items into new group zone to create new group with items
- use natural sort for group az sort
- right click to insert here, for when scrolling far away to insert?
    - or perhaps something at the bottom to represent the selected items, and can just drag that?

# ~~next steps 4~~ (CURRENT ISSUES)
- initial dragging onto empty page
    - whole page should be drop target, items dragged in should immediately create a new group
- drag proxy

# ~~next steps 5~~ (CURRENT ISSUES)
- fix dragging with the image name not registering as a valid image move
- fix drag proxy drag over not registering as valid drag move

# ~~to add to design~~ (tracking with issues)
- button to do auto rename
    - small text box with a button to the side or under it or around it?
- browse button to select base path
- editing group title design
    - group title this time will defitely be an input that spans the whole row instead of being a variable size
    - make background slightly dark?
- above the group title, have text showing number of images in that group