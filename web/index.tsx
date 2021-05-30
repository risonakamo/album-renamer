import React,{useState,useRef,useEffect} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {Provider,useSelector} from "react-redux";

import ImageRow from "components/image-row/image-row";
import NewGroupZone from "components/new-group-zone/new-group-zone";
import DragProxy from "components/drag-proxy/drag-proxy";

import {dropAtTarget,dropAtTargetGroup,replaceGroup,
  addGroup,getImageCount} from "lib/image-group-helpers";
import thestore from "store/store";
import {useImageGroups} from "hooks/useImageGroups";

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
  const {theImageGroups,imageGroupControl}=useImageGroups(sampleData3);

  const theImageGroups2=useSelector<TheStore,ImageGroup[]>(s=>s.imageGroups);
  const theSelectedImages2=useSelector<TheStore,ImageData2[]>(s=>s.selectedImages);

  /** the current item being dragged */
  const [currentDragItem,setCurrentDragItem]=useState<ImageData2|null>(null);
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

    window.addEventListener("dragend",()=>{
      setCurrentDragItem(null);
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

  /** thumbnail drag began. save the item that is being dragged right now */
  function thumbnailDragBegin(item:ImageData2,selected:boolean):void
  {
    setCurrentDragItem(item);
    currentDragItemSelected.current=selected;
  }

  /** clear selected images */
  function deselectAll():void
  {
    setSelectedImages([]);
  }

  /** cancel the current dragged item, because it has now been dropped */
  function cancelCurrentDraggedItem():void
  {
    setCurrentDragItem(null);
    currentDragItemSelected.current=false;
  }

  /** item was dropped on a thumbnail. does various things depending on conditions */
  function handleDropOnThumbnail(dropitem:ImageData2):void
  {
    // if there is no currently dragged item, cancel. probably a file drop case, which thumbnail drop
    // does not handle
    if (!currentDragItem)
    {
      console.log("invalid drag item");
      return;
    }

    // if the item being dragged is selected, move all selected items behind the target drop thumbnail
    if (currentDragItemSelected.current)
    {
      imageGroupControl.moveItemsBehindItem(theSelectedImages,dropitem);
      setSelectedImages([]);
    }

    // otherwise, move the item being dragged behind the target drop thumbnail
    else
    {
      imageGroupControl.moveItemsBehindItem([currentDragItem!],dropitem);
    }

    cancelCurrentDraggedItem();
  }

  /** items were dropped on an image row title */
  function handleDropOnGroupTitle(group:ImageGroup):void
  {
    // cancel if nothing is currently being dragged, so files were probably dropped. something else handles
    // that.
    if (!currentDragItem)
    {
      console.log("invalid drag item");
      return;
    }

    // if the item being dragged was selected, move all the selected items into the front of the group
    // that was dropped upon. deselect the items.
    if (currentDragItemSelected.current)
    {
      imageGroupControl.moveItemsToGroup(theSelectedImages,group);
      setSelectedImages([]);
    }

    // otherwise, move the currently being dragged item into the target group
    else
    {
      imageGroupControl.moveItemsToGroup([currentDragItem],group);
    }

    cancelCurrentDraggedItem();
  }

  /** handle new images have been dropped into an image group. images are moved into the end of the group
   *  as if they weren't actually new images */
  function handleDroppedNewItems(newdata:ImageData2[],group:ImageGroup):void
  {
    imageGroupControl.moveItemsToGroup(newdata,group,true);
  }

  /** handle group has been sorted. function provides the sorted group, just have to update it */
  function handleGroupSorted(sortedGroup:ImageGroup):void
  {
    imageGroupControl.doReplaceGroup(sortedGroup);
  }

  /** new group zone clicked. create a new group */
  function handleNewGroupClick():void
  {
    imageGroupControl.addEmptyGroup();
  }

  /** items dropped in new group zone. create new group from the currently selected items, or the single
   *  item if the currently selected item is not selected */
  function handleNewGroupDrop():void
  {
    if (currentDragItemSelected.current)
    {
      imageGroupControl.addGroupWithItems(theSelectedImages);
      setSelectedImages([]);
    }

    else
    {
      imageGroupControl.addGroupWithItems([currentDragItem!]);
    }

    cancelCurrentDraggedItem();
  }

  /** handle new images dropped into new group zone. add a group with the items */
  function handleNewGroupDropFiles(newImages:ImageData2[]):void
  {
    imageGroupControl.addGroupWithItems(newImages);
  }

  /** dragging the drag proxy. treat it as a selected item drag, since the proxy can only be dragged if
   *  there are selected items. set the current selected image to the first of the selected images */
  function handleDragProxyStart():void
  {
    currentDragItemSelected.current=true;
    setCurrentDragItem(theSelectedImages[0]);
  }

  function renderImageRows():JSX.Element[]
  {
    return _.map(theImageGroups,(x:ImageGroup,i:number):JSX.Element=>{
      return <ImageRow imagegroup={x} onThumbnailSelected={addSelectedImage}
        selectedImages={theSelectedImages} onThumbnailDeselected={removeSelectedImage}
        key={i} onThumbnailDrop={handleDropOnThumbnail} onThumbnailDragStart={thumbnailDragBegin}
        onGroupDrop={handleDropOnGroupTitle} onGroupSorted={handleGroupSorted}
        onDropNewImages={handleDroppedNewItems} dragValidOverride={!!currentDragItem}/>;
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
      <NewGroupZone onClick={handleNewGroupClick} onDrop={handleNewGroupDrop}
        onDropFiles={handleNewGroupDropFiles}/>
      <div className="drag-proxy-zone">
        <DragProxy count={theSelectedImages.length} onDragStart={handleDragProxyStart}/>
      </div>
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