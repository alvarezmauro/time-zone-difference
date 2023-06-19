"use client";

import { useState } from "react";
import TimezoneSelect, {
  type ITimezone,
  type ITimezoneOption,
} from "react-timezone-select";

import TimeZoneTable from "./TimeZoneTable";

const isITimezoneOption = (obj: ITimezone): obj is ITimezoneOption =>
  typeof obj === "object" &&
  obj !== null &&
  typeof obj.value === "string" &&
  typeof obj.label === "string" &&
  (typeof obj.abbrev === "undefined" || typeof obj.abbrev === "string") &&
  (typeof obj.altName === "undefined" || typeof obj.altName === "string") &&
  (typeof obj.offset === "undefined" || typeof obj.offset === "number");

export default function TimeZoneSelect() {
  const [selectedTimeZone, setSelectedTimeZone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [timeZoneData, setTimeZoneData] = useState<ITimezoneOption[]>([]);

  const handleTimezoneChange = function handleTimezoneChange(
    timezone: ITimezone,
  ) {
    setSelectedTimeZone(timezone);
    if (isITimezoneOption(timezone)) {
      setTimeZoneData([...timeZoneData, timezone]);
    }
  };

  return (
    <>
      <TimezoneSelect
        value={selectedTimeZone}
        onChange={handleTimezoneChange}
        className="w-full max-w-[700px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      <TimeZoneTable timeZoneData={timeZoneData} />
    </>
  );
}
