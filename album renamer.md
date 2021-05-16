# problem statement
renaming images is a common task that is done. the current solution is advanced renamer. it is very fully featured but as a result the workflow that is specific for renaming images is not as good. a new program that is more focused on the image renaming workflow would be an improvement over the currently used solution.

# strengths and weaknesses of advanced renamer
advanced renamer meets almost all requirements for the task at hand. specifically:
- rename files into a new target directory that does not yet exist
- automatically append 0s to new filenames ensure order
- set the starting number for files
- drag in files which are appended to the order list
- auto sort dragged in files by name
- specify custom syntax for output of rename. although the mostly used syntax is simply incrementing number
    - when implementing new program, investigate what other syntaxes might be useful

some actions that are performed during image renaming workflow that advnaced renamer is unable to accomodate:
- "incrementing" the target directory. often times the target output directory is a number, and the number needs to be able to be increased
- unknown if it already supports this, but auto sort should be by natural ascending
- image-based reordering of dragged in items. reordering is the most complex process of image renaming, and the renamer program offers no methods to assisting with this task, which makes sense. a new program should have some kind of workflow to help with this
- smaller dragzone which allows for "directory packing", a part of the workflow where already organised images are simply placed into directories, which all may require a custom path/name to be input, or just involve incrementing of numbers.
    - this task performed with the current renamer is not efficient, as requires manual dragging of items in the correct order
    - could possibly be better if the image reordering workflow allowed for many images to be organised into groups, each with their own path, and the renaming be done in bulk

# implementation requirements
## renamer requirements
the new renamer program must implement the original requirements that the current renamer program is able to achieve.

## image reordering workflow
the new renamer program must implement a newly designed workflow for reordering images.

# analysing image reordering workflow
currently this task is accomplished by use of the desktop, where items may be freely dragged to any location. however, it would seem that even with this freedom, different paths of workflows are usually followed

## group then sort workflow
in this workflow, images are often sectioned off into groups, with the intention that these images are most likely going to be in a single directory, although they may not be ordered yet. once all images are in groups, the images are reordered manually, and then directory packed through manual single item dragging

## pre-ordered, directory packing workflow
in this workflow, the images to be restructured are already in name order, however, they need to be split into multiple groups. this task involves determining the start/end of certain groups, dragging them in, and incrementing or specifying a new path in the directory field.

## conclusions
it would seem both workflows involve starting with a large set of images, dividing them up, and then performing the rename task in bulk, although the 2nd workflow does not involve it in bulk, it can technically be seen that way. the 2nd workflow is identical to the first workflow except that the user did not have to perform the initial reordering, as it was already in order. instead, they have to figure out the groups that are already preformed, as they did not form the groups themselves and it is not clearly divided such as when it is on the desktop. as such, it can be seen that if the 2nd case were brought to the point where everything is separated and ordered into its own group, it is identical to the 1st task at that point in time. **as such, perhaps the workflow should be a 2 step process, where the initial process is specific to re-ordering images into ordered and separated groups, and the 2nd process involves providing each group a target location, which may just be an increment of another group**

# designing the re-ordering process
the reordering system should have a focus for the following tasks:
- selecting multiple items to be split into a new group
- easily reordering items within a single group
- easily allowing for dragging in new items, which should appear in the order they appear on the desktop, or, if that is not possible, the order they were dragged in

## ideas for reordering process design
- display all items in a grid with resizable thumbnails
- when dragging, leave items in their position to not mess up anything and so it stays obvious
    - escape should cancel any sort of dragging, but retain selection
    - escape again or clicking without ctrl should cancel selections in expected manners
- would like to show the thumbnail dragging but perhaps that is hard
- drag on top of any image to insert after that image. perhaps leave a thin area in front of any group to represent dragging to the front
- reordering multiple items should place them in the **order they were selected**. perhaps add an option to replace this with "original order", but most likely selection order will come in handy more, so implement that first
- have an obvious area that is always on the screen where dragging to this area places the items into a new group.
- ctrl should copy an item. might be complex and there are workarounds to do this so might not need to be in initial implementation
- should be able to right click and do some sort of "insert here", in case it is difficult to drag long distances
- perhaps hold down some key to begin drag selection. might not be as useful now in an ordered grid environment, so maybe this is an idea for later
- should show a groupname, but should not be very permanent. maybe make it auto generated groupname, but allow renaming
    - in the same area where the groupname is showing, have auto sort by name. maybe will need more auto sorts but at least this should be good for now
- for thumbnails, should show the entire image, but in a square area. perhaps have a keyboard button and double click open the image in the default program. keyboard button would be so that selections are not inturrupted