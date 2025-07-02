"use client";
import { amenities, Amenity } from "@/utils/amenities";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

function AmenitiesInput({ defaultValue }: { defaultValue?: Amenity[] }) {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    defaultValue || amenities
  );

  const handleChange = (amenities: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenities.name) {
          return { ...a, selected: !a.selected };
        }
        return a;
      });
    });
  };
  return (
    <section>
      <input
        type="hidden"
        name="amenities"
        value={JSON.stringify(selectedAmenities)}
      />
      <div className="grid grid-cols-2 gap-4">
        {selectedAmenities.map((amenity) => (
          <div className="flex items-center space-x-2" key={amenity.name}>
            <Checkbox
              id={amenity.name}
              checked={amenity.selected}
              onCheckedChange={() => handleChange(amenity)}
            />
            <label
              htmlFor={amenity.name}
              className="text-sm font-medium leading-none capitalize flex gap-x-2 items-center"
            >
              {amenity.name}
              {/* <amenity.icon className="w-4 h-4" /> */}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AmenitiesInput;
