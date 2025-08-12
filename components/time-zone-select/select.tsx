"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import TimezoneSelect, {
  type ITimezone,
  type ITimezoneOption,
} from "react-timezone-select";

import getCssVariable from "@/lib/getCssVariable";
import { isITimezoneOption } from "@/lib/isITimezoneOption";

// import TimeZoneTable from "./table";

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

type SelectProps = {
  selectedTimeZone: ITimezone;
  setSelectedTimeZone: (timezone: ITimezone) => void;
  timeZoneData: ITimezoneOption[];
  setTimeZoneData: (timeZoneData: ITimezoneOption[]) => void;
};

/**
 * Select component
 *
 * @returns {JSX.Element} - Select input to pick a timezone and table to
 * display all the different timezones
 */
const Select: React.FC<SelectProps> = ({
  selectedTimeZone,
  setSelectedTimeZone,
  timeZoneData,
  setTimeZoneData,
}) => {
  const { theme: themeValue } = useTheme();

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

  return (
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
  );
};

export default Select;