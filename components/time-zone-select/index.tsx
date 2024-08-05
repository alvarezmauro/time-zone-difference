"use client";

import useLocalStorage from "use-local-storage";
import { useEffect, useState } from "react";

import Select from "./select";
import Table from "./table";

import { isITimezoneOption } from "@/lib/isITimezoneOption";

import {
  type ITimezone,
  type ITimezoneOption,
} from "react-timezone-select";

const TimeZoneSelect: React.FC = () => {
  const [isClient, setIsClient] = useState(false)
 
  const [selectedTimeZone, setSelectedTimeZone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [timeZoneData, setTimeZoneData] = useLocalStorage<ITimezoneOption[]>(
    "timeZone",
    [],
  );

  function onTimezoneDelete(timezone: ITimezone) {
    if (isITimezoneOption(timezone)) {
      setTimeZoneData(timeZoneData.filter((tz) => tz.value !== timezone.value));
    }
  }

  function moveTimeZoneLeft(timezone: ITimezone) {
    if (isITimezoneOption(timezone)) {
      const index = timeZoneData.findIndex((tz) => tz.value === timezone.value);
      if (index > 0) {
        const newTimeZoneData = [...timeZoneData];
        newTimeZoneData[index] = timeZoneData[index - 1];
        newTimeZoneData[index - 1] = timezone;
        setTimeZoneData(newTimeZoneData);
      }
    }
  }

  function moveTimeZoneRight(timezone: ITimezone) {
    if (isITimezoneOption(timezone)) {
      const index = timeZoneData.findIndex((tz) => tz.value === timezone.value);
      if (index < timeZoneData.length - 1) {
        const newTimeZoneData = [...timeZoneData];
        newTimeZoneData[index] = timeZoneData[index + 1];
        newTimeZoneData[index + 1] = timezone;
        setTimeZoneData(newTimeZoneData);
      }
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex flex-col items-start gap-2">
      {isClient && (<>
        <Select selectedTimeZone={selectedTimeZone} setSelectedTimeZone={setSelectedTimeZone} timeZoneData={timeZoneData} setTimeZoneData={setTimeZoneData} />
      <br />
      <Table
        timeZoneData={timeZoneData}
        onTimeZoneDelete={onTimezoneDelete}
        moveTimeZoneLeft={moveTimeZoneLeft}
        moveTimeZoneRight={moveTimeZoneRight}
      />
      </>
      )}
      
    </div>
  );
};

export { TimeZoneSelect };