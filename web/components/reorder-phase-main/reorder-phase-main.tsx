import React,{useState,useRef,useEffect} from "react";
import _ from "lodash";
import SimpleBar from "simplebar-react";
import {createSelector} from "reselect";

import ImageRow from "components/image-row/image-row";
import NewGroupZone from "components/new-group-zone/new-group-zone";
import DragProxy from "components/drag-proxy/drag-proxy";
import InitialDropZone from "components/initial-drop-zone/initial-drop-zone";
import Button84 from "components/button-84/button-84";
import FooterText from "components/footer-text/footer-text";
import PreviewOverlay from "components/preview-overlay/preview-overlay";

import {getImageCount,getImagesBetween} from "lib/image-group-helpers";
import {useImageGroups} from "hooks/useImageGroups";
import {useImageSize} from "hooks/useImageSize";
import {useSelectedImages} from "hooks/useSelectedImages";
import {findNextPath} from "lib/image-data-helpers";

import "css/phase-layout.less";
import "./reorder-phase-main.less";

interface ReorderPhaseMainProps
{
  onGroupsSubmit?(groups:ImageGroup[]):void
}

interface PreviewPanelState
{
  showing:boolean
  img:string
}

export default function ReorderPhaseMain(props:ReorderPhaseMainProps):JSX.Element
{
  const {theImageGroups,imageGroupControl}=useImageGroups([]);

  const {theSelectedImages,theLastSelected,selectedImageControl}=useSelectedImages();

  // the current item being dragged
  const [currentDragItem,setCurrentDragItem]=useState<ImageData2|null>(null);

  // if the current item being dragged is also selected
  const currentDragItemSelected=useRef<boolean>(false);

  const {theImageSize,imageSizeControl}=useImageSize(250,150,500,30);

  const [thePreviewPanelState,setPreviewPanelState]=useState<PreviewPanelState>({
    showing:false,
    img:""
  });

  const flatImagesSelector=createSelector(
    (groups:ImageGroup[]):ImageGroup[]=>groups,
    (groups:ImageGroup[]):ImageData2[]=>{
      return _.flatMap(groups,(x:ImageGroup):ImageData2[]=>{
        return x.items;
      });
    }
  );

  const selfRef=useRef<HTMLDivElement>(null);

  const imageCount:number=getImageCount(theImageGroups);
  const submitButtonDisabled:boolean=!imageCount;

  /** key handlers */
  useEffect(()=>{
    document.addEventListener("keydown",(e:KeyboardEvent):void=>{
      if (e.key=="Escape")
      {
        selectedImageControl.deselectAll();
      }
    });

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

    window.addEventListener("dragend",()=>{
      setCurrentDragItem(null);
    });

    selfRef.current?.focus();
  },[]);

  /** thumbnail drag began. save the item that is being dragged right now */
  function thumbnailDragBegin(item:ImageData2,selected:boolean):void
  {
    setCurrentDragItem(item);
    currentDragItemSelected.current=selected;
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
      selectedImageControl.deselectAll();
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
      selectedImageControl.deselectAll();
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
      selectedImageControl.deselectAll();
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

  /** handle thumbnail item was shift clicked. */
  function handleShiftSelect(data:ImageData2):void
  {
    if (theLastSelected)
    {
      var betweenImages:ImageData2[]=getImagesBetween(theLastSelected.data,data,theImageGroups);
      selectedImageControl.addMultipleSelected(betweenImages);
    }
  }

  /** thumbnail ctrl click loads and opens preview overlay */
  function handleThumbnailCtrlSelect(data:ImageData2):void
  {
    setPreviewPanelState({
      showing:true,
      img:data.path
    });
  }

  /** preview overlay signaled dismiss. hide it. */
  function handlePreviewOverlayDismiss():void
  {
    setPreviewPanelState({
      ...thePreviewPanelState,
      showing:false
    });
  }

  /** key handler. perform delete */
  function handleKey(e:React.KeyboardEvent<HTMLDivElement>):void
  {
    // if not focused
    if (document.activeElement!=e.currentTarget || thePreviewPanelState.showing)
    {
      return;
    }

    // remove all selected items with delete
    if (e.key=="Delete")
    {
      imageGroupControl.removeItems(theSelectedImages);
      selectedImageControl.deselectAll();
    }

    // ctrl+enter does same thing as clicking rename button
    else if (e.key=="Enter" && e.ctrlKey)
    {
      if (submitButtonDisabled)
      {
        return;
      }

      handleRenameButtonClick();
    }
  }

  /** previewer move forward */
  function h_previewerForward():void
  {
    setPreviewPanelState({
      showing:true,
      img:findNextPath(
        flatImagesSelector(theImageGroups),
        thePreviewPanelState.img
      )
    });
  }

  /** previewer move backward */
  function h_previewerBack():void
  {
    setPreviewPanelState({
      showing:true,
      img:findNextPath(
        flatImagesSelector(theImageGroups),
        thePreviewPanelState.img,
        false
      )
    });
  }

  /*----        RENDER        ----*/
  function renderImageRows():JSX.Element
  {
    var inner:JSX.Element[]=_.map(theImageGroups,(x:ImageGroup,i:number):JSX.Element=>{
      return <ImageRow imagegroup={x} onThumbnailSelected={selectedImageControl.addSelectedImage}
        selectedImages={theSelectedImages} onThumbnailDeselected={selectedImageControl.removeSelectedImage}
        key={i} onThumbnailDrop={handleDropOnThumbnail} onThumbnailDragStart={thumbnailDragBegin}
        onGroupDrop={handleDropOnGroupTitle} onGroupSorted={handleGroupSorted}
        onDropNewImages={handleDroppedNewItems} dragValidOverride={!!currentDragItem}
        onGroupRenamed={handleGroupRenamed} imageSize={theImageSize}
        onThumbnailShiftSelect={handleShiftSelect} onThumbnailCtrlClick={handleThumbnailCtrlSelect}
        highlightedImage={thePreviewPanelState.img}/>;
    });

    return <SimpleBar className="image-rows-contain">
      {inner}
    </SimpleBar>;
  }

  function renderInitialDropZone():JSX.Element|null
  {
    if (theImageGroups.length)
    {
      return null;
    }

    return <InitialDropZone onDropFiles={handleNewGroupDropFiles}/>
  }

  return <div className="reorder-phase-section phase-layout" tabIndex={-1} onKeyDown={handleKey}
    ref={selfRef}
  >
    <section className="header-zone top-section">
      <NewGroupZone onClick={handleNewGroupClick} onDrop={handleNewGroupDrop}
        onDropFiles={handleNewGroupDropFiles}/>
      <div className="drag-proxy-zone header-zone-container">
        <DragProxy count={theSelectedImages.length} onDragStart={handleDragProxyStart}/>
      </div>
      <div className="next-button-zone header-zone-container">
        <Button84 onClick={handleRenameButtonClick} disabled={submitButtonDisabled}
          icon="assets/temp_go-rename-group.png" hoverText="(ctrl+enter) Proceed to Rename Phase"/>
      </div>
    </section>

    <section className="top-section body-zone">
      {renderInitialDropZone()}
      {renderImageRows()}
    </section>

    <footer className="footer-zone top-section">
      <FooterText selected={theSelectedImages.length} groupCount={theImageGroups.length}
        imageCount={imageCount}/>
    </footer>

    <PreviewOverlay showing={thePreviewPanelState.showing} img={thePreviewPanelState.img}
      dismissed={handlePreviewOverlayDismiss} navForward={h_previewerForward}
      navBackward={h_previewerBack}/>
  </div>;
}