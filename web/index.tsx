import React,{useState,useRef,useEffect} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {Provider,useSelector} from "react-redux";

import ImageRow from "components/image-row/image-row";
import NewGroupZone from "components/new-group-zone/new-group-zone";

import {dropAtTarget,dropAtTargetGroup,replaceGroup,
  addGroup,getImageCount} from "lib/image-group-helpers";
import thestore from "store/store";

import "./index.less";

const sampleData3:ImageGroup[]=[
  {
    name:"group1",
    items:[
      {path:"../sampleimages/2.png",name:"2.png"},
      {path:"../sampleimages/1.png",name:"1.png"},
      {path:"../sampleimages/4.jpg",name:"4.png"},
      {path:"../sampleimages/6.png",name:"6.png"},
    ],
    key:1
  },
  {
    name:"group22",
    items:[
      {path:"../sampleimages/8.png",name:"8.png"},
      {path:"../sampleimages/3.png",name:"3.png"},
      {path:"../sampleimages/7.png",name:"7.png"},
      {path:"../sampleimages/5.jpg",name:"5.png"},
      {path:"../sampleimages/9.jpg",name:"9.png"},
    ],
    key:2
  }
];

function IndexMain():JSX.Element
{
  const [theSelectedImages,setSelectedImages]=useState<ImageData2[]>([]);
  const [theImageGroups,setImageGroups]=useState<ImageGroup[]>(sampleData3);

  const theImageGroups2=useSelector<TheStore,ImageGroup[]>(s=>s.imageGroups);
  const theSelectedImages2=useSelector<TheStore,ImageData2[]>(s=>s.selectedImages);

  /** the current item being dragged */
  const currentDragItem=useRef<ImageData2|null>(null);
  /** if the current item being dragged is also selected */
  const currentDragItemSelected=useRef<boolean>(false);

  /** key handlers */
  useEffect(()=>{
    document.addEventListener("keydown",(e:KeyboardEvent):void=>{
      if (e.key=="Escape")
      {
        deselectAll();
      }
    });
  },[]);

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
    if (!currentDragItem.current)
    {
      console.log("invalid drag item");
      return;
    }

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
    if (!currentDragItem.current)
    {
      console.log("invalid drag item");
      return;
    }

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

  /** move target items into a group */
  function moveNewItemsToDropGroup(images:ImageData2[],group:ImageGroup):void
  {
    setImageGroups(dropAtTargetGroup(group,images,theImageGroups,true));
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

  /** add a new group to the state */
  function addEmptyGroup():void
  {
    setImageGroups(addGroup(
      [],
      theImageGroups
    ).groups);
  }

  /** add a new group and move the currently selected items into that group */
  function addGroupWithSelectItems():void
  {
    var newgroup:ImageGroup;
    var newgroups:ImageGroup[];
    var {newgroup,groups:newgroups}=addGroup(
      theSelectedImages,
      theImageGroups
    );

    setImageGroups(newgroups);

    moveItemsToDropGroup(newgroup);
  }

  /** clear selected images */
  function deselectAll():void
  {
    setSelectedImages([]);
  }

  /** render image rows */
  function renderImageRows():JSX.Element[]
  {
    return _.map(theImageGroups,(x:ImageGroup,i:number):JSX.Element=>{
      return <ImageRow imagegroup={x} onThumbnailSelected={addSelectedImage}
        selectedImages={theSelectedImages} onThumbnailDeselected={removeSelectedImage}
        key={i} onThumbnailDrop={moveItemsToDropTarget} onThumbnailDragStart={thumbnailDragBegin}
        onGroupDrop={moveItemsToDropGroup} onGroupSorted={doReplaceGroup}
        onDropNewImages={moveNewItemsToDropGroup}/>;
    });
  }

  function renderFootText():JSX.Element
  {
    const groupCount:number=theImageGroups.length;
    const selectedCount:number=theSelectedImages.length;
    const imageCount:number=getImageCount(theImageGroups);

    var selectedCountText:string="";
    if (selectedCount>0)
    {
      selectedCountText=`, ${selectedCount} selected`;
    }

    return <p>{`${imageCount} images, ${groupCount} groups${selectedCountText}`}</p>
  }


  return <>
    <section className="header-zone top-section">
      <NewGroupZone onClick={addEmptyGroup} onDrop={addGroupWithSelectItems}/>
    </section>

    <section className="image-zone top-section">
      {renderImageRows()}
    </section>

    <footer className="footer-zone top-section">
      {renderFootText()}
    </footer>
  </>;
}

function main()
{
  ReactDOM.render(<Provider store={thestore}><IndexMain/></Provider>,document.querySelector(".main"));
}

window.onload=main;