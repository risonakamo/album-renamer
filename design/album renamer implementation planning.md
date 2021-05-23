# to implement later
- ellipsis in the middle of text instead of at the end
    - will need to do some manual logic. right now using the css's default text overflow
- more styled scrollbar with larger width
- thumbnail zooming
- ability to make copies of items
- "undoing selections" system, for accidentally deselecting or selecting something incorrectly
- right click to insert here, for when scrolling far away to insert?
    - or perhaps something at the bottom to represent the selected items, and can just drag that?
- have recently moved items be some colour for a while before fading away
- see if can adjust the drag sensitivity, but maybe not, since with explorer it is still pretty sensitive
- have status area show number selected

# things to decide
- ~~what to do if dragged an item that was not selected while a selection is going on~~
    - currently set to allow single item dragging, if item is not selected
- ~~should it allow dragging onto itself? or should that just cancel the operation so nothing happens?~~
    - currently will do nothing if dragged into itself
- maybe in the future disallow dragging into a selected item. possibly a rare use case, just have to see how it is used
- maybe dragging onto itself should select/deselect?

# next steps (TRACKED WITH ISSUES)
- dropping into a group
- dropping to make a new group
- have drag arrow appear on drop target
- selection order numbers
- editable group name
    - debounce save/re-render?
- group name sort button
- deselect all button
    - esc on keyboard