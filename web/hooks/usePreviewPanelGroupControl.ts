import {useState} from "react";
import _ from "lodash";

/** provides state to control a preview panel with multiple images */
export function usePreviewPanelGroupControl()
{
    const [showing,setShowing]=useState<boolean>(false);

    const [currentImage,setCurrentImage]=useState<ImageData2>({
        path:"",
        name:""
    });

    const [images,setImages]=useState<ImageGroup>({
        name:"",
        items:[],
        key:0,
        imagerule:"",
        renamed:false
    });

    const [imageIndex,setImageIndex]=useState<number>(0);

    /** trigger hide */
    function dismiss():void
    {
        setShowing(false);
    }

    /** open an imagedata with a group and open the preview panel. */
    function open(image:ImageData2,group:ImageGroup):void
    {
        setCurrentImage(image);
        setShowing(true);
        setImages(group);

        const targetImageIndex:number=_.findIndex(group.items,(x:ImageData2):boolean=>{
            return x==image;
        });

        if (targetImageIndex<0)
        {
            console.error("unable to find target image in given group");
            setImageIndex(0);
        }

        else
        {
            setImageIndex(targetImageIndex);
        }
    }

    /** nav forward in group */
    function navForward():void
    {
        if (imageIndex>=images.items.length-1)
        {
            return;
        }

        setCurrentImage(images.items[imageIndex+1]);
        setImageIndex(imageIndex+1);
    }

    /** nav backward in group */
    function navBackward():void
    {
        if (!imageIndex)
        {
            return;
        }

        setCurrentImage(images.items[imageIndex-1]);
        setImageIndex(imageIndex-1);
    }

    return [
        // state for preview panel
        showing,
        currentImage,
        images,

        // control
        open,
        dismiss,

        navForward,
        navBackward
    ] as const;
}