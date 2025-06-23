import { useProperty } from "@/utils/store";
import { SignInButton, useAuth } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import SubmitButton from "../form/Buttons";
import { createBookingAction } from "@/utils/actions";

const ConfirmBooking = () => {
  const userId = useAuth();
  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button type="button" className="w-full">
          Sign In to Complete Booking
        </Button>
      </SignInButton>
    );
  }
  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });
  return (
    <FormContainer action={createBooking}>
      <SubmitButton className="w-full" text="reserve" />
    </FormContainer>
  );
};

export default ConfirmBooking;
