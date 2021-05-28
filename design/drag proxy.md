# drag proxy
system replacing right click to move. dragging the drag proxy is the same as dragging a selected item.

# design
- when not selected, the whole drag proxy including the text will be slightly faded out
    - hovering over will fade it in, but will not do anything otherwise
    - will have an x in the middle
- selecting things will cause the number to increase to represent the number of selected items
- proxy will be faded in, with a slightly blue background, but perhaps not fully faded in
- hovering over when there are selected items will fade it in even more, and definitely cause the blue background to fade in more
- perhaps while a drag is occuring, the blue background lights up. maybe this happens when anything is being dragged
    - this might be complex, so maybe this becomes a todo for later