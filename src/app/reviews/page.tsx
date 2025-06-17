import React from "react";
import Title from "../properties/Title";
import {
  deleteReviewAction,
  fetchPropertyReviewsByUser,
} from "@/utils/actions";
import EmptyList from "@/components/home/EmptyList";
import ReviewCard from "@/components/reviews/ReviewCard";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";

const Reviews = async () => {
  const reviews = await fetchPropertyReviewsByUser();
  if (reviews.length === 0) return <EmptyList />;

  return (
    <>
      <Title text="Your Reviews here" />
      <section className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { rating, comment } = review;
          const { image, name } = review.property;
          const reviewInfo = {
            rating,
            comment,
            image,
            name,
          };
          return (
            <ReviewCard reviewInfo={reviewInfo} key={review.id}>
              <DeleteReviews reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
};

const DeleteReviews = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};

export default Reviews;
