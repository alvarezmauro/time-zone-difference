"use client";

import { type ITimezoneOption } from "react-timezone-select";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/icons";

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

type ITimeZoneTableProps = {
  timeZoneData: ITimezoneOption[];
  onTimeZoneDelete: (timezone: ITimezoneOption) => void;
  moveTimeZoneLeft: (timezone: ITimezoneOption) => void;
  moveTimeZoneRight: (timezone: ITimezoneOption) => void;
};

const TimeZoneTable: React.FC<ITimeZoneTableProps> = ({
  timeZoneData,
  onTimeZoneDelete,
  moveTimeZoneLeft,
  moveTimeZoneRight,
}) => (
  <Table className="w-full overflow-x-auto sm:w-auto">
    <TableHeader>
      <TableRow className="transition-none hover:bg-inherit">
        {timeZoneData.map((timeZone, index) => {
          // Add border to all columns except the first and last
          let tableHeadBorderX = "";
          if (index !== timeZoneData.length - 1 && index !== 0) {
            tableHeadBorderX += "border-x";
          }

          return (
            <TableHead
              key={`${timeZone.value}_header`}
              className={cn("px-0", tableHeadBorderX)}
            >
              <div className="flex h-full flex-col flex-nowrap justify-normal">
                <div className="flex shrink grow items-center justify-center px-4 pb-2 text-center">
                  {timeZone.altName}
                </div>

                <div className="flex h-auto shrink grow-0 items-center rounded-md border-0 bg-background p-0">
                  <Button
                    variant="outline"
                    disabled={index === 0}
                    className="m-0 flex flex-1 cursor-default select-none items-center rounded-none border-0 border-r-2 px-3 py-1.5 text-sm font-medium"
                    onClick={() => {
                      moveTimeZoneLeft(timeZone);
                    }}
                  >
                    <Icons.chevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="m-0 flex flex-1 cursor-default select-none items-center rounded-none border-0 border-r-2 px-3 py-1.5 text-sm font-medium"
                    onClick={() => {
                      onTimeZoneDelete(timeZone);
                    }}
                  >
                    <Icons.x className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    disabled={index === timeZoneData.length - 1}
                    className="m-0 flex flex-1 cursor-default select-none items-center rounded-none border-0 px-3 py-1.5 text-sm font-medium"
                    onClick={() => {
                      moveTimeZoneRight(timeZone);
                    }}
                  >
                    <Icons.chevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
    <TableBody className="border-b">
      {Array.from(Array(24).keys()).map((hour) => (
        <TableRow key={`hour_${hour}`}>
          {timeZoneData.map((timeZone, index) => {
            const offset = timeZone.offset ?? 0;

            // Add border to all columns except the first and last
            let tableCellBorderX = "";
            if (index !== timeZoneData.length - 1 && index !== 0) {
              tableCellBorderX += " border-x";
            }

            return (
              <TableCell
                className={cn(
                  "min-w-[9rem] px-0 text-center sm:w-[16rem]",
                  tableCellBorderX,
                )}
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

export default TimeZoneTable;
