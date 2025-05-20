import { fetchProperties } from "@/utils/actions";
import { PropertyCardProps } from "@/utils/types";
import React from "react";
import EmptyList from "./EmptyList";
import PropertiesList from "./PropertiesList";

const PropertiesContainer = async ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties: PropertyCardProps[] = await fetchProperties({
    search,
    category,
  });
  if (properties.length === 0) {
    return (
      <EmptyList
        heading="No results."
        message="Try changing or removing some of your filters."
        btnText="Clear Filters"
      />
    );
  }
  return <PropertiesList properties={properties} />;
};

export default PropertiesContainer;
