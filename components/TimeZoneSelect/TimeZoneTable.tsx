"use client";

import { type ITimezoneOption } from "react-timezone-select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function getHourValue(hour: number, clockType: "12" | "24"): string {
  let hourValue = hour % 24;
  const minute = 0;
  if (hourValue < 0) {
    hourValue += 24;
  }

  if (clockType === "12") {
    const suffix = hourValue >= 12 ? "PM" : "AM";
    hourValue = hourValue % 12 || 12;

    return `${String(hourValue).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0",
    )} ${suffix}`;
  }

  return `${String(hourValue).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0",
  )}`;
}

export default function TimeZoneTable({
  timeZoneData,
}: {
  timeZoneData: ITimezoneOption[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="transition-none hover:bg-inherit">
          {timeZoneData.map((timeZone, index) => {
            let className = "border-x";
            if (index === timeZoneData.length - 1 || index === 0) {
              className = "";
            }
            return (
              <TableHead key={`${timeZone.value}_title`} className={className}>
                {timeZone.altName}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody className="border-b">
        {Array.from(Array(24).keys()).map((hour) => (
          <TableRow key={hour}>
            {timeZoneData.map((timeZone, index) => {
              let className = "border-x";
              if (index === timeZoneData.length - 1 || index === 0) {
                className = "";
              }

              const offset = timeZone.offset ?? 0;

              return (
                <TableCell
                  className={className}
                  key={`${timeZone.value}_${hour}`}
                >
                  {getHourValue(hour + offset, "12")}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
