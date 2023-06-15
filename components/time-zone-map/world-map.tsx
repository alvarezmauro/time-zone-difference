import React, { ReactElement } from "react";
import * as d3 from "d3";
import * as GeoJSON from "geojson";
import * as topojson from "topojson-client";
import type { Topology } from "topojson-specification";

import timezoneTopologyJson from "./time-zones.json";
import { findTimeZone } from "./utils";

/**
 * Why I'm using the word "feature" here?
 * GeoJSON supports the following geometry types: Point, LineString,
 * Polygon, MultiPoint, MultiLineString, and MultiPolygon.
 * Geometric objects with additional properties are Feature objects.
 */
type PolygonFeature = GeoJSON.Feature<
  GeoJSON.Polygon,
  GeoJSON.GeoJsonProperties
>;

/**
 * Read world map polygon data.
 * @returns array of polygon data
 */
const createTimeZonePolygonFeatures = (): PolygonFeature[] => {
  // Read world map for timezones.
  // See https://github.com/evansiroky/timezone-boundary-builder
  //     https://github.com/topojson/topojson
  //
  // Somehow TS type definition does not match with the actual data, and I need to resort to
  // forceful casting.
  const timeZoneData: Topology = timezoneTopologyJson as unknown as Topology;
  const timeZoneDataFeature = topojson.feature(
    timeZoneData,
    timeZoneData.objects.timezones,
  );
  const { features } = timeZoneDataFeature as { features: PolygonFeature[] };
  return features;
};

type TimeZoneStyle = {
  opacity: number;
  stroke: string;
  strokeWidth: number;
  fill: string;
};

type WorldMapProps = {
  /** Time zone name selected e.g. "Asia/Tokyo" */
  timeZoneName?: string;
  /** Selected time zone style. */
  selectedTimeZoneStyle?: TimeZoneStyle;
  /** Selected time zone style. */
  sameOffsetTimeZoneStyle?: TimeZoneStyle;
  /** Unselected time zone style. */
  unselectedTimeZoneStyle?: TimeZoneStyle;
  /** Called when a timezone is selected. */
  onChange: (timeZoneName: string) => void;
};

export default function WorldMap({
  timeZoneName,
  selectedTimeZoneStyle = {
    opacity: 1.0,
    stroke: "darkgrey",
    fill: "darkgrey",
    strokeWidth: 0.5,
  },
  sameOffsetTimeZoneStyle = {
    opacity: 0.7,
    stroke: "grey",
    fill: "lightgrey",
    strokeWidth: 0.5,
  },
  unselectedTimeZoneStyle = {
    opacity: 0.4,
    stroke: "lightgrey",
    fill: "lightgrey",
    strokeWidth: 0.5,
  },
  onChange,
}: WorldMapProps): ReactElement {
  function handleClick(event: React.MouseEvent<SVGPathElement, MouseEvent>) {
    // Note: We have a few "unresolved" areas on map. We ignore clicking on those areas.
    const timezone = findTimeZone((event.target as SVGPathElement).id);
    if (timezone) {
      onChange(timezone.name);
    }
  }

  const pathGenerator = d3.geoPath();
  const timeZonePolygonFeatures = React.useMemo(
    createTimeZonePolygonFeatures,
    [],
  );
  const selectedTimeZone = findTimeZone(timeZoneName);
  const timeZonePaths = timeZonePolygonFeatures.map(
    (timeZonePolygonFeature: PolygonFeature) => {
      const id = `${timeZonePolygonFeature.properties?.id as string}`;
      // Time zone corresponding to the polygon.
      const timeZone = findTimeZone(id);
      let timeZoneStyle;
      if (selectedTimeZone && selectedTimeZone === timeZone) {
        // Selected timezone.
        timeZoneStyle = selectedTimeZoneStyle;
      } else if (
        selectedTimeZone &&
        timeZone &&
        selectedTimeZone.rawOffsetInMinutes === timeZone.rawOffsetInMinutes
      ) {
        // Same offset timezones.
        timeZoneStyle = sameOffsetTimeZoneStyle;
      } else {
        // Unselected timezones.
        timeZoneStyle = unselectedTimeZoneStyle;
      }

      const generatedPath = pathGenerator(timeZonePolygonFeature) || undefined;
      const title = timeZone
        ? `${timeZone.countryName} / ${timeZone.mainCities[0]}`
        : "";
      return (
        <path
          {...timeZoneStyle}
          id={id}
          key={id}
          data-testid={id}
          d={generatedPath}
          onClick={handleClick}
        >
          <title>{title}</title>
        </path>
      );
    },
  );

  return (
    <svg viewBox="0 0 800 320">
      <g style={{ cursor: "pointer" }} transform="matrix(2 0 0 -2 400 200)">
        {timeZonePaths}
      </g>
    </svg>
  );
}
