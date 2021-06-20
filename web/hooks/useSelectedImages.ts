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
        addMultipleSelected([imagedata]);
    }

    /** add multiple images to the end of the selected images array. sets the last selected to the
     *  1st item of the given list */
    function addMultipleSelected(images:ImageData2[]):void
    {
        if (!images.length)
        {
            return;
        }

        var joinedSelection:ImageData2[]=[
            ...theSelectedImages,
            ...images
        ];

        setSelectedImages(_.uniqBy(joinedSelection,(x:ImageData2):string=>{
            return x.path;
        }));

        setLastSelected({
            data:images[0],
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
            addMultipleSelected,
            removeSelectedImage,
            deselectAll
        }
    };
}