"use client";

import { useState } from "react";
import getCssVariable from "@/utils/getCssVariable";
import TimezoneSelect, {
  type ITimezone,
  type ITimezoneOption,
} from "react-timezone-select";
import useLocalStorage from "use-local-storage";

import TimeZoneTable from "./TimeZoneTable";

const CSS_VARIABLES = {
  background: `hsl(${getCssVariable("--background")})`,
  foreground: `hsl(${getCssVariable("--foreground")})`,
  primary: `hsl(${getCssVariable("--primary")})`,
  primaryForeground: `hsl(${getCssVariable("--primary-foreground")})`,
  input: `hsl(${getCssVariable("--input")})`,
  ring: `hsl(${getCssVariable("--ring")})`,
  radius: getCssVariable("--radius"),
  accent: `hsl(${getCssVariable("--accent")})`,
};

const isITimezoneOption = (obj: ITimezone): obj is ITimezoneOption =>
  typeof obj === "object" &&
  obj !== null &&
  typeof obj.value === "string" &&
  typeof obj.label === "string" &&
  (typeof obj.abbrev === "undefined" || typeof obj.abbrev === "string") &&
  (typeof obj.altName === "undefined" || typeof obj.altName === "string") &&
  (typeof obj.offset === "undefined" || typeof obj.offset === "number");

/**
 * TimeZoneSelect component
 *
 * @returns {JSX.Element} - Select input to pick a timezone and table to
 * display all the different timezones
 */
export default function TimeZoneSelect() {
  const [selectedTimeZone, setSelectedTimeZone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [timeZoneData, setTimeZoneData] = useLocalStorage<ITimezoneOption[]>(
    "timeZone",
    [],
  );

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
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: CSS_VARIABLES.background,
            borderColor: CSS_VARIABLES.input,
            fontSize: ".875rem",
            borderRadius: `calc(${CSS_VARIABLES.radius} - 2px)`,
            height: "2.5rem",
            "&:hover, &:focus": {
              boxShadow: `${CSS_VARIABLES.background} 0px 0px 0px 2px, ${CSS_VARIABLES.ring} 0px 0px 0px 4px, ${CSS_VARIABLES.primary} 0px 0px 0px 0px`,
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
            color: CSS_VARIABLES.foreground,
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: CSS_VARIABLES.foreground,
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: CSS_VARIABLES.background,
            borderRadius: CSS_VARIABLES.radius,
            boxShadow: `0px 0px 0px 1px ${CSS_VARIABLES.ring}`,
            marginTop: "0.25rem",
            zIndex: 1,
            overflow: "hidden",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused
              ? CSS_VARIABLES.primary
              : CSS_VARIABLES.background,
            color: state.isFocused
              ? CSS_VARIABLES.primaryForeground
              : CSS_VARIABLES.foreground,
            "&:hover": {
              backgroundColor: CSS_VARIABLES.primary,
              color: CSS_VARIABLES.primaryForeground,
            },
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: CSS_VARIABLES.accent,
            primary50: CSS_VARIABLES.primaryForeground,
            primary75: CSS_VARIABLES.ring,
            primary: CSS_VARIABLES.ring,
          },
        })}
        className="w-full max-w-[700px]"
      />
      <br />
      <TimeZoneTable timeZoneData={timeZoneData} />
    </>
  );
}
