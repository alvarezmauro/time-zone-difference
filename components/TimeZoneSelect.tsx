"use client";

import { useState } from "react";
import TimezoneSelect, { type ITimezone } from "react-timezone-select";

export default function TimeZoneSelect() {
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  const handleTimezoneChange = function handleTimezoneChange(
    timezone: ITimezone,
  ) {
    console.log(timezone);
    setSelectedTimezone(timezone);
  };

  return (
    <TimezoneSelect
      value={selectedTimezone}
      onChange={handleTimezoneChange}
      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  );
}
