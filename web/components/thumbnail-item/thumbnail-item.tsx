import React,{useRef,useState} from "react";
import cx from "classnames";

import "./thumbnail-item.less";

interface ThumbnailItemProps
{
  data:ImageData2
  selected?:boolean

  onSelected?(data:ImageData2):void
  onDeselect?(data:ImageData2):void
}

export default function ThumbnailItem(props:ThumbnailItemProps):JSX.Element
{
  const [isWideFit,setWideFit]=useState<boolean>(false);
  const imgElement=useRef<HTMLImageElement>(null);

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

  /** handle item clicked */
  function itemClicked():void
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

  const imgElementClasses={
    wide:isWideFit,
    tall:!isWideFit
  };

  const imageSpaceClass={
    selected:props.selected
  };

  return <div className="thumbnail-item" onClick={itemClicked}>
    <div className={cx("image-space",imageSpaceClass)}>
      <img src={props.data.path} className={cx(imgElementClasses)}
        ref={imgElement} onLoad={imageLoaded}/>
    </div>
    <div className="title-zone">
      <p>{props.data.name}</p>
    </div>
  </div>;
}