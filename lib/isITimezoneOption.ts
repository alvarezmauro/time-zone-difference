import {
  type ITimezone,
  type ITimezoneOption,
} from "react-timezone-select";

const isITimezoneOption = (obj: ITimezone): obj is ITimezoneOption =>
  typeof obj === "object" &&
  obj !== null &&
  typeof obj.value === "string" &&
  typeof obj.label === "string" &&
  (typeof obj.abbrev === "undefined" || typeof obj.abbrev === "string") &&
  (typeof obj.altName === "undefined" || typeof obj.altName === "string") &&
  (typeof obj.offset === "undefined" || typeof obj.offset === "number");

export { isITimezoneOption };