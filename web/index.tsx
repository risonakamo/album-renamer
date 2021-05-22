import React,{useState,useRef} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import ImageRow from "components/image-row/image-row";

import {dropAtTarget} from "lib/image-group-helpers";

import "./index.less";

const sampleData3:ImageGroup[]=[
  {
    name:"group1",
    items:[
      {path:"../sampleimages/2.png",name:"2.png"},
      {path:"../sampleimages/1.png",name:"2.png"},
      {path:"../sampleimages/4.jpg",name:"2.png"},
      {path:"../sampleimages/6.png",name:"2.png"},
    ]
  },
  {
    name:"group22",
    items:[
      {path:"../sampleimages/8.png",name:"2.png"},
      {path:"../sampleimages/3.png",name:"2.png"},
      {path:"../sampleimages/7.png",name:"2.png"},
      {path:"../sampleimages/5.jpg",name:"2.png"},
      {path:"../sampleimages/9.jpg",name:"2.png"},
    ]
  }
];

function IndexMain():JSX.Element
{
  const [theSelectedImages,setSelectedImages]=useState<ImageData2[]>([]);
  const [theImageGroups,setImageGroups]=useState<ImageGroup[]>(sampleData3);

  const currentDragItem=useRef<ImageData2|null>(null);
  const currentDragItemSelected=useRef<boolean>(false);

  /** add an image as another selected image */
  function addSelectedImage(imagedata:ImageData2):void
  {
    setSelectedImages([
      ...theSelectedImages,
      imagedata
    ]);
  }

  /** remove a target image data from selected images */
  function removeSelectedImage(imagedata:ImageData2):void
  {
    setSelectedImages(_.reject(theSelectedImages,(x:ImageData2):boolean=>{
      return x.path==imagedata.path;
    }));
  }

  /** perform move operation to the given target, modifying the image groups */
  function moveItemsToDropTarget(dropitem:ImageData2):void
  {
    // if the item being dragged is selected
    if (currentDragItemSelected.current)
    {
      setImageGroups(dropAtTarget(dropitem,theSelectedImages,theImageGroups));
      setSelectedImages([]);
    }

    else
    {
      moveSingleItemToDropTarget(dropitem,currentDragItem.current!);
    }

    currentDragItem.current=null;
    currentDragItemSelected.current=false;
  }

  /** move a single item to after the drop target. does not affect selections */
  function moveSingleItemToDropTarget(dropitem:ImageData2,moveitem:ImageData2):void
  {
    setImageGroups(dropAtTarget(dropitem,[moveitem],theImageGroups))
  }

  /** thumbnail drag began. save the item that is being dragged right now */
  function thumbnailDragBegin(item:ImageData2,selected:boolean):void
  {
    currentDragItem.current=item;
    currentDragItemSelected.current=selected;
  }

  /** render image rows */
  function renderImageRows():JSX.Element[]
  {
    return _.map(theImageGroups,(x:ImageGroup,i:number):JSX.Element=>{
      return <ImageRow images={x} onThumbnailSelected={addSelectedImage}
        selectedImages={theSelectedImages} onThumbnailDeselected={removeSelectedImage}
        key={i} onThumbnailDrop={moveItemsToDropTarget} onThumbnailDragStart={thumbnailDragBegin}/>;
    });
  }

  return <>
    <section className="header-zone top-section">

    </section>

    <section className="image-zone top-section">
      {renderImageRows()}
    </section>

    <footer className="footer-zone top-section">

    </footer>
  </>;
}

function main()
{
  ReactDOM.render(<IndexMain/>,document.querySelector(".main"));
}

window.onload=main;