import React,{useState,useRef} from "react";

interface DraggedOverState
{
    draggedOver:boolean
    hasFiles:boolean
}

/** hook that provides state indicating if an element is being dragged over.
 *  must attach all provided handlers to the element to track drag over state. */
export function useDraggedOver()
{
    const [isDraggedOver,setDraggedOver]=useState<DraggedOverState>({
        draggedOver:false,
        hasFiles:false
    });

    const dragEnterCount=useRef<number>(0);

    function handleDrop():void
    {
        setDraggedOver({
            draggedOver:false,
            hasFiles:false
        });
        dragEnterCount.current=0;
    }

    function handleDragEnter(e:React.DragEvent):void
    {
        setDraggedOver({
            draggedOver:true,
            hasFiles:dragEventHasFiles(e)
        });

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
            setDraggedOver({
                draggedOver:false,
                hasFiles:false
            });
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
    return !dragevent.dataTransfer.types.length
        || (dragevent.dataTransfer.types.length==1
        && dragevent.dataTransfer.types[0]=="Files");
}