import { useTheme } from "@/hooks/useTheme";
import { Event } from "@/api/events/types";
import { VisLeafletMap } from "@unovis/react";
import { useMemo, useState } from "react";

type Bounds = {
  northEast: { lat: number; lng: number };
  southWest: { lat: number; lng: number };
};

type MapDataRecord = {
  latitude: number;
  longitude: number;
  id: string;
  name: string;
  address: string;
  category: string;
};

interface EventMapComponentProps {
  events?: Event[];
  showSingleEvent?: boolean;
}

export const EventMapComponent = ({
  events,
  showSingleEvent = false,
}: EventMapComponentProps) => {
  const { theme } = useTheme();

  const apiKey = import.meta.env.VITE_LEAFLET_MAP_API_KEY;

  const attribution: string[] = [
    `<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a>`,
    `<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>`,
  ] as const;

  const [defaultBounds] = useState<Bounds>({
    northEast: { lat: 50.0413, lng: 20.9991 },
    southWest: { lat: 50.0021, lng: 20.9367 },
  });

  const pointColor = (d: MapDataRecord) => {
    switch (d.category) {
      case "Koncert":
        return "#ff6b6b";
      case "Konferencja":
        return "#4ecdc4";
      case "Warsztat":
        return "#45b7d1";
      case "Festiwal":
        return "#f9ca24";
      case "Wystawa":
        return "#6c5ce7";
      case "Sport":
        return "#a29bfe";
      case "Teatr":
        return "#fd79a8";
      default:
        return "#888888";
    }
  };
  const mapData = useMemo(() => {
    if (events && events.length > 0) {
      return events
        .filter((event) => event.location.latitude && event.location.longitude)
        .map((event) => ({
          latitude: parseFloat(event.location.latitude?.toString() || "0"),
          longitude: parseFloat(event.location.longitude?.toString() || "0"),
          id: event.id,
          name: event.name,
          address: event.location.address,
          category: event.type,
        }));
    }
    return [];
  }, [events]);

  const bounds = useMemo(() => {
    if (showSingleEvent && events && events.length === 1) {
      const event = events[0];
      const lat = parseFloat(event.location.latitude?.toString() || "50.05");
      const lng = parseFloat(event.location.longitude?.toString() || "20.95");
      const offset = 0.01;

      return {
        northEast: { lat: lat + offset, lng: lng + offset },
        southWest: { lat: lat - offset, lng: lng - offset },
      };
    }
    return defaultBounds;
  }, [showSingleEvent, events, defaultBounds]);

  const isDark = useMemo(() => {
    return (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme]);

  const mapStyle = useMemo(() => {
    const styleType = isDark ? "basic-v2-dark" : "basic-v2";
    return `https://api.maptiler.com/maps/${styleType}/style.json?key=${apiKey}`;
  }, [apiKey, isDark]);

  return (
    <>
      <div className={"relative rounded-md overflow-hidden h-full"}>
        <VisLeafletMap
          key={mapStyle}
          style={mapStyle}
          attribution={attribution}
          initialBounds={bounds}
          pointShape="ring"
          data={mapData}
          pointColor={pointColor}
        />
      </div>
    </>
  );
};
