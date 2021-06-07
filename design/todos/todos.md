# general
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
- animations/transitions for css
- some sort of response for hovering over thumbnails
    - maybe fade them out a little and make it bluish?
- drop arrow when dragging over group title
- az sort should toggle between reverse and not reverse until a movement has been made, where it should do non reverse first
    - different icons for az sort state
- selected proxy box X icon could be better

## 4
- plan preview system from double click
    - maybe open default preview program
    - or custom preview program with fast ability to close
- shift selection system

## 5
- redesign "drag in items" text to be something instead of just a line of text
- group reordering
- faded white background to show the image being dragged when dragging single image
- slight blue or green background when dragging over another image (together with the green arrow)
    - not too dark, need to be able to see the image being dragged over
    - just the green arrow seems too non-visble, at least right now with the thin green arrow
- dont show green arrow when dragging over self, since dropping on self does nothing
- have new group zone text slightly (very slightly) faded out until hover over

# image loading
- how to handle video files as thumbnails
- dragged in images have no faded out drag preview for some reason

# rename page
## 1
- error output under the rename button when something fails
    - might not ahve it initially, just fail in the console
- button to go back to rename phase

## 2
- show a mark on items that have been auto renamed
    - maybe in the checkbox column
    - maybe coloured border around the check box?
    - maybe change colour of check box?
        - might stand out too much
    - maybe make name of group slightly greyer colour
    - when edited should change back to normal
- show shadowy "#" sign at the end of the auto rename box to represent that it is a prefix
- fade out apply button when nothing is selected, but still allow typing
    - or perhaps just allow clikcing it? it will do nothing but will clear out the box. perhaps this is a purposeful action
- hovering over group should have faded background to help with determining the row and for row responsiveness
- clicking the entire area around the check box should select the box
- dragging down the check box list should set selection, but NOT unselect
- small icon next to invalid text boxes in addition to them becoming yellow
- make invalid group name yellow colour more faded