import {useState} from "react";
import _ from "lodash";

/** return a controlled image size state with a specified minimum and maximum size, and an increment
 *  for when using the increment and decrement function */
export function useImageSize(initial:number,minsize:number,maxsize:number,inc:number)
{
    const [theImageSize,setImageSize]=useState<number>(initial);

    /** increment the size by the preset increment. will not exceed max size */
    function increment():void
    {
        var newsize:number=_.clamp(theImageSize+inc,minsize,maxsize);

        setImageSize(newsize);
    }

    /** decrement the size by the preset increment. will not exceed min size */
    function decrement():void
    {
        var newsize:number=_.clamp(theImageSize-inc,minsize,maxsize);

        setImageSize(newsize);
    }

    return {
        theImageSize,
        imageSizeControl:{
            increment,
            decrement,
            setImageSize
        }
    };
}