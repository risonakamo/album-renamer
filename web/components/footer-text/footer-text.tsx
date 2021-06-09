import React from "react";

interface FooterTextProps
{
  selected:number
  groupCount:number
  imageCount:number
}

export default function FooterText(props:FooterTextProps):JSX.Element
{
  var selectedCountText:string="";
  if (props.selected>0)
  {
    selectedCountText=`, ${props.selected} selected`;
  }

  return <p>{`${props.imageCount} images, ${props.groupCount} groups${selectedCountText}`}</p>;
}