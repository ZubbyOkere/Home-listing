import React from "react";
import { Card, CardHeader } from "../ui/card";

type StatsCardProp = {
  title: string;
  value: number;
};
const StatsCard = ({ title, value }: StatsCardProp) => {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row justify-between items-center">
        <h3 className="capitalize text-3xl font-bold">{title}</h3>
        <span className="text-primary text-5xl font-extrabold">{value}</span>
      </CardHeader>
    </Card>
  );
};

export default StatsCard;
