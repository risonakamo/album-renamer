import {useState} from "react";
import _ from "lodash";

interface LastSelected
{
    data:ImageData2
    selected:boolean
}

/** hook that manages a selection of imagedata2s and the last selected items */
export function useSelectedImages()
{
    const [theSelectedImages,setSelectedImages]=useState<ImageData2[]>([]);
    const [theLastSelected,setLastSelected]=useState<LastSelected|null>(null);

    /** add an image as a selected image */
    function addSelectedImage(imagedata:ImageData2):void
    {
        setSelectedImages([
            ...theSelectedImages,
            imagedata
        ]);

        setLastSelected({
            data:imagedata,
            selected:true
        });
    }

    /** remove a target image data from selected images */
    function removeSelectedImage(imagedata:ImageData2):void
    {
        setSelectedImages(_.reject(theSelectedImages,(x:ImageData2):boolean=>{
            return x.path==imagedata.path;
        }));

        setLastSelected({
            data:imagedata,
            selected:false
        });
    }

    /** deselect all selected images */
    function deselectAll():void
    {
        setSelectedImages([]);
    }

    return {
        theSelectedImages,
        theLastSelected,
        selectedImageControl:{
            addSelectedImage,
            removeSelectedImage,
            deselectAll
        }
    };
}