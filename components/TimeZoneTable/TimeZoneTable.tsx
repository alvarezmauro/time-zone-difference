"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { timeZoneData } from "./mockData";

type TimeZoneColumn = {
  id: string;
  label: string;
  offset: number;
  abbrev: string;
  altName: string;
};

function calculateTimeDifference(timeZone: TimeZoneColumn) {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const newDate = new Date(utc + 3600000 * timeZone.offset);
  return newDate.toLocaleString();
}

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

export function TimeZoneTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {timeZoneData.map((timeZone, index) => {
            let className = "border-x";
            if (index === timeZoneData.length - 1 || index === 0) {
              className = "";
            }
            return (
              <TableHead key={`${timeZone.id}_title`} className={className}>
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

              return (
                <TableCell className={className} key={`${timeZone.id}_${hour}`}>
                  {getHourValue(hour + timeZone.offset, "12")}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
