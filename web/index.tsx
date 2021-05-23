import React,{useState,useRef} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import ImageRow from "components/image-row/image-row";

import {dropAtTarget,dropAtTargetGroup,replaceGroup} from "lib/image-group-helpers";

import "./index.less";

const sampleData3:ImageGroup[]=[
  {
    name:"group1",
    items:[
      {path:"../sampleimages/2.png",name:"2.png"},
      {path:"../sampleimages/1.png",name:"1.png"},
      {path:"../sampleimages/4.jpg",name:"4.png"},
      {path:"../sampleimages/6.png",name:"6.png"},
    ]
  },
  {
    name:"group22",
    items:[
      {path:"../sampleimages/8.png",name:"8.png"},
      {path:"../sampleimages/3.png",name:"3.png"},
      {path:"../sampleimages/7.png",name:"7.png"},
      {path:"../sampleimages/5.jpg",name:"5.png"},
      {path:"../sampleimages/9.jpg",name:"9.png"},
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
      setImageGroups(dropAtTarget(dropitem,[currentDragItem.current!],theImageGroups))
    }

    currentDragItem.current=null;
    currentDragItemSelected.current=false;
  }

  /** move operation into a target group */
  function moveItemsToDropGroup(group:ImageGroup):void
  {
    if (currentDragItemSelected.current)
    {
      setImageGroups(dropAtTargetGroup(group,theSelectedImages,theImageGroups));
      setSelectedImages([]);
    }

    else
    {
      setImageGroups(dropAtTargetGroup(group,[currentDragItem.current!],theImageGroups));
    }

    currentDragItem.current=null;
    currentDragItemSelected.current=false;
  }

  /** update groups with a replacement group */
  function doReplaceGroup(group:ImageGroup):void
  {
    setImageGroups(replaceGroup(group,theImageGroups));
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
      return <ImageRow imagegroup={x} onThumbnailSelected={addSelectedImage}
        selectedImages={theSelectedImages} onThumbnailDeselected={removeSelectedImage}
        key={i} onThumbnailDrop={moveItemsToDropTarget} onThumbnailDragStart={thumbnailDragBegin}
        onGroupDrop={moveItemsToDropGroup} onGroupSorted={doReplaceGroup}/>;
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