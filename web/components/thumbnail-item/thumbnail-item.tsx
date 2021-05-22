import React,{useRef,useState} from "react";
import cx from "classnames";

import "./thumbnail-item.less";

interface ThumbnailItemProps
{
  data:ImageData2
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

  const imgElementClasses={
    wide:isWideFit,
    tall:!isWideFit
  };

  return <div className="thumbnail-item">
    <div className="image-space">
      <img src={props.data.path} className={cx(imgElementClasses)}
        ref={imgElement} onLoad={imageLoaded}/>
    </div>
    <div className="title-zone">
      <p>{props.data.name}</p>
    </div>
  </div>;
}