"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "../form/RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import SubmitButton from "../form/Buttons";

const SubmitReview = ({ propertyId }: { propertyId: string }) => {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const handleReviewFormVisibility = () => {
    setIsReviewFormVisible((prev) => !prev);
  };
  return (
    <div className="mt-8">
      <Button onClick={handleReviewFormVisibility}>Leave a review</Button>
      {isReviewFormVisible && (
        <Card className="p-8 mt-12">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="propertyId" value={propertyId} />
            <RatingInput name="rating" />
            <TextAreaInput
              name="comment"
              labelText="your thoughts on this property"
              defaultValue="Amazing place !!!"
            />
            <SubmitButton text="Submit" className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
};

export default SubmitReview;
