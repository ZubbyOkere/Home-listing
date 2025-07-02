export type actionFunction = (
  state: { message: string },
  formData: FormData
) => Promise<{ message: string }>;

export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};

export type DateRangeSelect = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type Booking = {
  checkIn: Date;
  checkOut: Date;
};

export type Rental = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: string;
  country: string;
  description: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string;
  image: string;
};
