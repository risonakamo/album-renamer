import React,{useRef,useState} from "react";
import cx from "classnames";

import "./thumbnail-item.less";

interface ThumbnailItemProps
{
  data:ImageData2
  selected?:boolean

  onSelected?(data:ImageData2):void
  onDeselect?(data:ImageData2):void
  onDragStart?(data:ImageData2):void
  onDropped?(data:ImageData2):void
}

export default function ThumbnailItem(props:ThumbnailItemProps):JSX.Element
{
  const [isWideFit,setWideFit]=useState<boolean>(false);
  const [isDraggedOver,setDraggedOver]=useState<boolean>(false);

  const imgElement=useRef<HTMLImageElement>(null);
  const dragEnterCount=useRef<number>(0);

  /*-- MEMBER FUNCTIONS --*/
  /** auto fit image on image load */
  function imageLoaded():void
  {
    if (imgElement.current!.naturalWidth>imgElement.current!.naturalHeight)
    {
      setWideFit(true);
    }

    else
    {
      setWideFit(false);
    }
  }

  /*-- HANDLERS --*/
  /** handle item clicked */
  function handleClick():void
  {
    if (!props.selected)
    {
      props.onSelected?.(props.data);
    }

    else
    {
      props.onDeselect?.(props.data);
    }
  }

  /** DRAG HANDLERS */
  function dragBegin():void
  {
    props.onDragStart?.(props.data);
  }

  function handleDrop():void
  {
    props.onDropped?.(props.data);

    setDraggedOver(false);
    dragEnterCount.current=0;
  }

  function handleDragEnter(e:React.DragEvent):void
  {
    e.preventDefault();
    setDraggedOver(true);
    dragEnterCount.current++;
  }

  function handleDragLeave(e:React.DragEvent):void
  {
    dragEnterCount.current--;
    if (!dragEnterCount.current)
    {
      setDraggedOver(false);
    }
  }

  function handleDragOver(e:React.DragEvent):void
  {
    e.preventDefault();
  }

  /*-- RENDER --*/
  const imgElementClasses={
    wide:isWideFit,
    tall:!isWideFit
  };

  const imageSpaceClass={
    selected:props.selected,
    "drop-target":isDraggedOver
  };

  return <div className="thumbnail-item" onClick={handleClick} onDragStart={dragBegin}
    onDrop={handleDrop} onDragEnter={handleDragEnter} onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
  >
    <div className={cx("image-space",imageSpaceClass)}>
      <img src={props.data.path} className={cx(imgElementClasses)}
        ref={imgElement} onLoad={imageLoaded}/>
    </div>
    <div className="title-zone">
      <p>{props.data.name}</p>
    </div>
  </div>;
}