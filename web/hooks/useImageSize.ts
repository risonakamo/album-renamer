import {useState,useEffect} from "react";
import _ from "lodash";

interface ImageSizeControl
{
    increment():void
    decrement():void
    setImageSize:React.Dispatch<React.SetStateAction<number>>
}

/** return a controlled image size state with a specified minimum and maximum size, and an increment
 *  for when using the increment and decrement function */
export function useImageSize(initial:number,minsize:number,maxsize:number,inc:number)
{
    const [theImageSize,setImageSize]=useState<number>(initial);

    /** increment the size by the preset increment. will not exceed max size */
    function increment():void
    {
        // callback form for use in useeffect
        setImageSize((prev:number)=>{
            return _.clamp(prev+inc,minsize,maxsize);
        });
    }

    /** decrement the size by the preset increment. will not exceed min size */
    function decrement():void
    {
        setImageSize((prev:number)=>{
            return _.clamp(prev-inc,minsize,maxsize);
        });
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

/** attach an image size control to document wheel handler */
export function useImageSizeWheelHandler(imageSizeControl:ImageSizeControl):void
{
    useEffect(()=>{
        document.addEventListener("wheel",(e:WheelEvent):void=>{
            if (e.ctrlKey && e.deltaY!=0)
            {
                if (e.deltaY>0)
                {
                    imageSizeControl.decrement();
                }

                else
                {
                    imageSizeControl.increment();
                }
            }
        });
    },[]);
}