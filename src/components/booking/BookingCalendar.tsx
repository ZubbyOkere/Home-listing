"use client";
import {
  defaultSelected,
  generateBlockedPeriods,
  generateDateRange,
  generateDisabledDates,
} from "@/utils/calender";
import { Calendar } from "@/components/ui/calendar";

import { useProperty } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useToast } from "../ui/hooks/use-toast";

const BookingCalendar = () => {
  const { toast } = useToast();
  const currentDate = new Date();

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const bookings = useProperty((state) => state.bookings);
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });
  const unavailableDate = generateDisabledDates(blockedPeriods);
  useEffect(() => {
    const selectedRange = generateDateRange(range);
    const isDisabledDateIncluded = selectedRange.some((date) => {
      if (unavailableDate[date]) {
        setRange(defaultSelected);
        toast({
          description: "Some dates are booked. Please select again.",
        });
        return true;
      }
      return false;
    });
    useProperty.setState({ range });
  }, [range, toast, unavailableDate]);
  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      disabled={blockedPeriods}
    />
  );
};

export default BookingCalendar;
