"use client";

import { useState } from "react";
import TimezoneSelect, { type ITimezone } from "react-timezone-select";

type TimeZoneSelectProps = {
  onChange?: (timezone: ITimezone) => void;
};

export default function TimeZoneSelect({ onChange }: TimeZoneSelectProps) {
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  const handleTimezoneChange = function handleTimezoneChange(
    timezone: ITimezone,
  ) {
    setSelectedTimezone(timezone);
    if (onChange) {
      onChange(timezone);
    }
  };

  return (
    <TimezoneSelect
      value={selectedTimezone}
      onChange={handleTimezoneChange}
      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  );
}
