"use client";
import React, { useState } from "react";
import Title from "./Title";
import { Button } from "@/components/ui/button";

function Description({ description }: { description: string }) {
  const [isShowFullDescription, setIsShowFullDescription] = useState(false);

  const words = description.split(" ");
  const isLongDescription = words.length > 70;

  const toggleDescription = () => {
    setIsShowFullDescription(!isShowFullDescription);
  };

  const displayedDescription =
    isLongDescription && !isShowFullDescription
      ? words.slice(0, 70).join(" ") + "..."
      : description;
  return (
    <article>
      <Title text="description" />
      <p>{displayedDescription}</p>
      {isLongDescription && (
        <Button onClick={toggleDescription} variant={"link"} className="pl-0">
          {isShowFullDescription ? "show less" : "show more"}
        </Button>
      )}
    </article>
  );
}

export default Description;
