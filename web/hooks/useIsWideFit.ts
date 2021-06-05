import React,{useState} from "react";

/** hook that manages a state which says whether a target image is wide or not. required to attach
 *  the provided onload function to the target image */
export function useIsWideFit(imgElement:React.RefObject<HTMLImageElement>)
{
    const [isWideFit,setIsWideFit]=useState<boolean>(false);

    /** attach to the target image's onload. */
    function handleImageLoad():void
    {
        if (!imgElement.current)
        {
            return;
        }

        if (imgElement.current.naturalWidth>imgElement.current.naturalHeight)
        {
            setIsWideFit(true);
        }

        else
        {
            setIsWideFit(false);
        }
    }

    return {
        isWideFit,
        handleImageLoad
    };
}