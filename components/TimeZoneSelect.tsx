"use client";

import { useState } from "react";
import TimezoneSelect, { ITimezoneOption } from "react-timezone-select";

export default function TimeZoneSelect() {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  const handleTimezoneChange = function handleTimezoneChange(
    timezone: ITimezoneOption,
  ) {
    console.log(timezone.value);
    setSelectedTimezone(timezone.value);
  };

  return (
    <TimezoneSelect
      value={selectedTimezone}
      onChange={handleTimezoneChange}
      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  );
}
