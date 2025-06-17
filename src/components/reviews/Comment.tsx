"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const Comment = ({ comment }: { comment: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleComment = () => {
    setIsExpanded(!isExpanded);
  };

  const longComment = comment.length > 130;
  const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment;
  return (
    <div>
      <p>{displayComment}</p>
      {longComment && (
        <Button onClick={toggleComment}>
          {isExpanded ? "show less" : "show more"}
        </Button>
      )}
    </div>
  );
};

export default Comment;
