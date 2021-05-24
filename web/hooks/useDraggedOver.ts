import {useState,useRef} from "react";

interface UseDraggedOverHook
{
    isDraggedOver:boolean
    useDraggedOverHandlers:{
        handleDrop():void
        handleDragEnter():void
        handleDragLeave():void
    }
}

/** hook that provides state indicating if an element is being dragged over.
 *  must attach all provided handlers to the element to track drag over state. */
export function useDraggedOver():UseDraggedOverHook
{
    const [isDraggedOver,setDraggedOver]=useState<boolean>(false);

    const dragEnterCount=useRef<number>(0);

    function handleDrop():void
    {
        setDraggedOver(false);
        dragEnterCount.current=0;
    }

    function handleDragEnter():void
    {
        setDraggedOver(true);
        dragEnterCount.current++;
    }

    function handleDragLeave():void
    {
        dragEnterCount.current--;
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