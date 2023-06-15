"use client";

import { useState } from "react";

import WorldMap from "./world-map";

export function TimeZoneMap() {
  const [selectedTimeZoneName, setSelectedTimeZoneName] = useState<
    string | undefined
  >("America/Argentina/Buenos_Aires");

  return (
    <WorldMap
      timeZoneName={selectedTimeZoneName}
      onChange={(selectedValue) => setSelectedTimeZoneName(selectedValue)}
    />
  );
}
