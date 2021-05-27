# loading images
image need to be loaded by dragging them in. based on previous use case, it is useful for them to be dragged in *quickly and without aim*. therefore, the window should be the entire target, HOWEVER, it may be useful for aim to matter. perhaps dragged in items should follow the same rules as dragging in internally

# ideas for drag in behaviour
- somehow have a single group be the "default" drop group, and all items dragged into the window, regardless of position, appears in this drop group
- the entire area of a group is droppable.  all images that fall onto the entire area of a drop group will appear at the end of the drop group
- same behaviour as internal dragging. dragging item from outside ontop of an item in a drop group adds it after that item.
    - dont think this is good. the point is, to add all iamges from outside inside as rapidly as possible, and then sorting occurs internally. no sorting should need to happen from the outside

# decision
so i think, the use case that should happen the most, is a whole blob or selection of completely unordered or at least no-order-guaranteeded images is dragged in, possibly into a group?

## first case
- whole window is drop target. ok, so what group should it appear in? and what even use case would there be to drag in more aside from the inital drag?
    - maybe i forgot to process some, or i just downloaded some more images and would like to process these as well
    - how about they appear in a completely new group as to not affect the old groups?

## 2nd case
- gives more control, and, since im not planning on dragging in new stuff often, why not. it shouldnt matter that im able to quickly drag things in.

# decision 2
lets first start by seeing how easy it is to accomplish getting image data from dragged in items. then we can see how hard it is to get case 3 working, since it is the smallest break from the usual workflow. and, the requirement to drag in quickly and without aim is actually not a requirement.

# decision 3
from use case research, it turns out dragging in items quickly is in fact a use case. in this case, the desired functionality is that the dragged in items all appear sequentially in the order they were dragged in. this puts case 3 out (requires too much aiming), and case 1 out (each drag creates a new group). it is still useful to create a new group, but also definitely want it possible to drag into the same group. case 2 is seeming like a very interesting approach now...

so deciding to go with implementation case 2 for now:
- drag into the general area of an image group to append to the end of the image group
- drag into the new group area to create a new group

# todos
- border around image group when dragging over files
    - normal drag borders should not appear
- drag items into new group zone to create new group with items
- how to handle video files as thumbnails