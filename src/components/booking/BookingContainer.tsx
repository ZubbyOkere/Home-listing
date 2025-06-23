import { useProperty } from "@/utils/store";
import React from "react";
import BookingForm from "./BookingForm";
import ConfirmBooking from "./ConfirmBooking";

const BookingContainer = () => {
  const { range } = useProperty((state) => state);
  const currentDate = new Date();

  if (!range || !range.from || !range.to) return null;
  if (range.to!.getTime() === range.from!.getTime()) return null;
  if (range.to.getTime() < currentDate.getTime()) return null; // Use currentDate
  return (
    <div className="w-full">
      <BookingForm />
      <ConfirmBooking />
    </div>
  );
};

export default BookingContainer;
