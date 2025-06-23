import { calculateDaysBetween } from "@/utils/calender";

type BookingDetails = {
  checkIn: Date;
  checkOut: Date;
  price: number;
};
const calculateTotals = ({ checkIn, checkOut, price }: BookingDetails) => {
  const totalNights = calculateDaysBetween({ checkIn, checkOut });
  const subTotal = totalNights * price;
  const cleaning = 21;
  const service = 40;
  const tax = subTotal * 0.1;
  const orderTotal = cleaning + service + tax + totalNights + subTotal;

  return { totalNights, subTotal, cleaning, service, tax, orderTotal };
};

export default calculateTotals;
