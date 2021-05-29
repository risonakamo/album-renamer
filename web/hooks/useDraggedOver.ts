import React,{useState,useRef} from "react";

interface UseDraggedOverHook
{
    isDraggedOver:boolean
    useDraggedOverHandlers:{
        handleDrop():void
        handleDragEnter(e:React.DragEvent):void
        handleDragLeave(e:React.DragEvent):void
    }
}

/** hook that provides state indicating if an element is being dragged over.
 *  must attach all provided handlers to the element to track drag over state.
 *  provide withFiles to only trigger if the drag event contains files. give withBoth to
 *  trigger in both cases (with and without files) */
export function useDraggedOver(withFiles:boolean=false,withBoth:boolean=false):UseDraggedOverHook
{
    const [isDraggedOver,setDraggedOver]=useState<boolean>(false);

    const dragEnterCount=useRef<number>(0);

    function handleDrop():void
    {
        setDraggedOver(false);
        dragEnterCount.current=0;
    }

    function handleDragEnter(e:React.DragEvent):void
    {
        if (!withBoth && !withFilesHasFilesCheck(withFiles,e))
        {
            return;
        }

        setDraggedOver(true);
        dragEnterCount.current++;
    }

    function handleDragLeave(e:React.DragEvent):void
    {
        dragEnterCount.current--;

        if (dragEnterCount.current<0)
        {
            dragEnterCount.current=0;
        }

        if (!dragEnterCount.current)
        {
          setDraggedOver(false);
        }
    }

    return {
        isDraggedOver,
        useDraggedOverHandlers:{
            handleDrop,
            handleDragEnter,
            handleDragLeave
        }
    };
}

/** return if the particular event has files in it or not */
function dragEventHasFiles(dragevent:React.DragEvent):boolean
{
    return !dragevent.dataTransfer.types.length ||
        (dragevent.dataTransfer.types.length==1 &&
        dragevent.dataTransfer.types[0]=="Files");
}

/** return if the drag event fulfils the withFiles condition. */
function withFilesHasFilesCheck(withFiles:boolean,e:React.DragEvent)
{
    return (withFiles && dragEventHasFiles(e)) || (!withFiles && !dragEventHasFiles(e));
}