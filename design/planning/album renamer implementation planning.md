# ~~to implement later~~ (MOVED TO TODOS DOC)
## 1
- ellipsis in the middle of text instead of at the end
    - will need to do some manual logic. right now using the css's default text overflow
- more styled scrollbar with larger width
- thumbnail zooming
- ability to make copies of items
- "undoing selections" system, for accidentally deselecting or selecting something incorrectly
- have recently moved items be some colour for a while before fading away
- see if can adjust the drag sensitivity, but maybe not, since with explorer it is still pretty sensitive
- when making the real drop arrow, make it pretty visible since the dragged ghost image kind of obscures it

## 2
- fix some slight flashing when reordering
- deselect button instead of just keyboard key

## 3
- remove button for group
- do some animations/transitions for css
- some sort of response for hovering over thumbnails
    - maybe fade them out a little and make it bluish?

## 4
- drop arrow when dragging over group title
- az sort should toggle between reverse and not reverse until a movement has been made, where it should do non reverse first
    - different icons for az sort state
- right click to insert here, for when scrolling far away to insert?
    - or perhaps something at the bottom to represent the selected items, and can just drag that?
- double click to open some kind of preview? that goes away quickly with one button
- use natural sort for group az sort

# things to decide
- ~~what to do if dragged an item that was not selected while a selection is going on~~
    - currently set to allow single item dragging, if item is not selected
- ~~should it allow dragging onto itself? or should that just cancel the operation so nothing happens?~~
    - currently will do nothing if dragged into itself
- maybe in the future disallow dragging into a selected item. possibly a rare use case, just have to see how it is used
- maybe dragging onto itself should select/deselect?