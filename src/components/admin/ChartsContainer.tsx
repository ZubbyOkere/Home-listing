import { fetchChartsData } from "@/utils/actions";
import React from "react";
import Chart from "./Chart";

const ChartsContainer = async () => {
  const bookings = await fetchChartsData();
  if (bookings.length < 1) return null;

  return <Chart data={bookings} />;
};

export default ChartsContainer;
