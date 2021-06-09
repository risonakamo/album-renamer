import React,{useState,useRef,useEffect} from "react";
import _ from "lodash";

import ImageRow from "components/image-row/image-row";
import NewGroupZone from "components/new-group-zone/new-group-zone";
import DragProxy from "components/drag-proxy/drag-proxy";
import InitialDropZone from "components/initial-drop-zone/initial-drop-zone";
import Button84 from "components/button-84/button-84";

import {getImageCount} from "lib/image-group-helpers";
import {useImageGroups} from "hooks/useImageGroups";

import "css/phase-layout.less";
import "./reorder-phase-main.less";

interface ReorderPhaseMainProps
{
  onGroupsSubmit?(groups:ImageGroup[]):void
}

export default function ReorderPhaseMain(props:ReorderPhaseMainProps):JSX.Element
{
  const [theSelectedImages,setSelectedImages]=useState<ImageData2[]>([]);
  const {theImageGroups,imageGroupControl}=useImageGroups([]);

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

  /** handle new images dropped into new group zone. add a group with the items. also shared with
   *  initial drop zone. */
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

  /** submit the image groups, excluding ones with no items */
  function handleRenameButtonClick():void
  {
    props.onGroupsSubmit?.(_.filter(theImageGroups,(x:ImageGroup):boolean=>{
      return !!x.items.length;
    }));
  }

  /** image row signaled group name updated. replace it */
  function handleGroupRenamed(group:ImageGroup):void
  {
    imageGroupControl.doReplaceGroup(group);
  }

  /*----        RENDER        ----*/
  const imageCount:number=getImageCount(theImageGroups);

  function renderImageRows():JSX.Element[]
  {
    return _.map(theImageGroups,(x:ImageGroup,i:number):JSX.Element=>{
      return <ImageRow imagegroup={x} onThumbnailSelected={addSelectedImage}
        selectedImages={theSelectedImages} onThumbnailDeselected={removeSelectedImage}
        key={i} onThumbnailDrop={handleDropOnThumbnail} onThumbnailDragStart={thumbnailDragBegin}
        onGroupDrop={handleDropOnGroupTitle} onGroupSorted={handleGroupSorted}
        onDropNewImages={handleDroppedNewItems} dragValidOverride={!!currentDragItem}
        onGroupRenamed={handleGroupRenamed}/>;
    });
  }

  function renderFootText():JSX.Element
  {
    const groupCount:number=theImageGroups.length;
    const selectedCount:number=theSelectedImages.length;

    var selectedCountText:string="";
    if (selectedCount>0)
    {
      selectedCountText=`, ${selectedCount} selected`;
    }

    return <p>{`${imageCount} images, ${groupCount} groups${selectedCountText}`}</p>
  }

  function renderInitialDropZone():JSX.Element|null
  {
    if (theImageGroups.length)
    {
      return null;
    }

    return <InitialDropZone onDropFiles={handleNewGroupDropFiles}/>
  }

  const submitButtonDisabled:boolean=!imageCount;

  return <div className="reorder-phase-section phase-layout">
    <section className="header-zone top-section">
      <NewGroupZone onClick={handleNewGroupClick} onDrop={handleNewGroupDrop}
        onDropFiles={handleNewGroupDropFiles}/>
      <div className="drag-proxy-zone header-zone-container">
        <DragProxy count={theSelectedImages.length} onDragStart={handleDragProxyStart}/>
      </div>
      <div className="next-button-zone header-zone-container">
        <Button84 onClick={handleRenameButtonClick} disabled={submitButtonDisabled}
          icon="assets/temp_go-rename-group.png"/>
      </div>
    </section>

    <section className="top-section body-zone">
      {renderInitialDropZone()}
      {renderImageRows()}
    </section>

    <footer className="footer-zone top-section">
      {renderFootText()}
    </footer>
  </div>;
}