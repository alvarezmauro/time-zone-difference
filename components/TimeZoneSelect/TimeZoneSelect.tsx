"use client";

import { useEffect, useState } from "react";
import getCssVariable from "@/utils/getCssVariable";
import { useTheme } from "next-themes";
import TimezoneSelect, {
  type ITimezone,
  type ITimezoneOption,
} from "react-timezone-select";
import useLocalStorage from "use-local-storage";

import TimeZoneTable from "./TimeZoneTable";

const isITimezoneOption = (obj: ITimezone): obj is ITimezoneOption =>
  typeof obj === "object" &&
  obj !== null &&
  typeof obj.value === "string" &&
  typeof obj.label === "string" &&
  (typeof obj.abbrev === "undefined" || typeof obj.abbrev === "string") &&
  (typeof obj.altName === "undefined" || typeof obj.altName === "string") &&
  (typeof obj.offset === "undefined" || typeof obj.offset === "number");

/**
 * Get CSS variables
 * @returns CSS variable
 */
function getCustomStyles() {
  return {
    background: `hsl(${getCssVariable("--background")})`,
    foreground: `hsl(${getCssVariable("--foreground")})`,
    primary: `hsl(${getCssVariable("--primary")})`,
    primaryForeground: `hsl(${getCssVariable("--primary-foreground")})`,
    input: `hsl(${getCssVariable("--input")})`,
    ring: `hsl(${getCssVariable("--ring")})`,
    radius: getCssVariable("--radius"),
    accent: `hsl(${getCssVariable("--accent")})`,
  };
}

/**
 * TimeZoneSelect component
 *
 * @returns {JSX.Element} - Select input to pick a timezone and table to
 * display all the different timezones
 */
const TimeZoneSelect: React.FC = () => {
  const { theme: themeValue } = useTheme();
  const [selectedTimeZone, setSelectedTimeZone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [timeZoneData, setTimeZoneData] = useLocalStorage<ITimezoneOption[]>(
    "timeZone",
    [],
  );
  const [cssVariables, setCssVariables] = useState(getCustomStyles());

  // This is a workaround to update the css variables when the theme changes
  // otherwise the react-select component doesn't update the styles
  useEffect(() => {
    // Update the css variables when the theme changes after one second
    // to allow the transition to finish
    setTimeout(() => {
      setCssVariables(getCustomStyles());
    }, 0);
  }, [themeValue]);

  const handleTimezoneChange = function handleTimezoneChange(
    timezone: ITimezone,
  ) {
    setSelectedTimeZone(timezone);
    if (isITimezoneOption(timezone)) {
      if (!timeZoneData.some((tz) => tz.value === timezone.value)) {
        setTimeZoneData([...timeZoneData, timezone]);
      }
    }
  };

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

  return (
    <>
      <TimezoneSelect
        value={selectedTimeZone}
        onChange={handleTimezoneChange}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: `hsl(${getCssVariable("--background")})`,
            borderColor: cssVariables.input,
            fontSize: ".875rem",
            borderRadius: `calc(${cssVariables.radius} - 2px)`,
            height: "2.5rem",
            "&:hover, &:focus": {
              boxShadow: `${cssVariables.background} 0px 0px 0px 2px, ${cssVariables.ring} 0px 0px 0px 4px, ${cssVariables.primary} 0px 0px 0px 0px`,
            },
          }),
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            lineHeight: "1.25rem",
            paddingLeft: ".75rem",
            paddingRight: ".75rem",
            height: "2.5rem",
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: cssVariables.foreground,
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: cssVariables.foreground,
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: cssVariables.background,
            borderRadius: cssVariables.radius,
            boxShadow: `0px 0px 0px 1px ${cssVariables.ring}`,
            marginTop: "0.25rem",
            zIndex: 1,
            overflow: "hidden",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused
              ? cssVariables.primary
              : cssVariables.background,
            color: state.isFocused
              ? cssVariables.primaryForeground
              : cssVariables.foreground,
            "&:hover": {
              backgroundColor: cssVariables.primary,
              color: cssVariables.primaryForeground,
            },
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: cssVariables.accent,
            primary50: cssVariables.primaryForeground,
            primary75: cssVariables.ring,
            primary: cssVariables.ring,
          },
        })}
        className="w-full max-w-[700px]"
      />
      <br />
      <TimeZoneTable
        timeZoneData={timeZoneData}
        onTimeZoneDelete={onTimezoneDelete}
        moveTimeZoneLeft={moveTimeZoneLeft}
        moveTimeZoneRight={moveTimeZoneRight}
      />
    </>
  );
};

export default TimeZoneSelect;
