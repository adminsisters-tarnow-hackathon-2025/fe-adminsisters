import { useTheme } from "@/hooks/useTheme";
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
  type: string;
  label: string;
};

export const MapComponent = () => {
  const { theme } = useTheme();

  const apiKey = import.meta.env.VITE_LEAFLET_MAP_API_KEY;
  const attribution: string[] = [
    `<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a>`,
    `<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>`,
  ] as const;
  const pointColor = (d: MapDataRecord) => {
    switch (d.type) {
      case "restaurant":
        return "#FF5733";
      case "school":
        return "#33C1FF";
      case "hospital":
        return "#FF33A8";
      default:
        return "#888888";
    }
  };

  const [initialBounds] = useState<Bounds>({
    northEast: { lat: 50.0413, lng: 20.9991 },
    southWest: { lat: 50.0021, lng: 20.9367 },
  });
  const [points] = useState<MapDataRecord[]>([
    {
      latitude: 50.05,
      longitude: 20.95,
      type: "restaurant",
      id: "1",
      label: "Chuj",
    },
    {
      latitude: 50.07,
      longitude: 20.98,
      type: "school",
      id: "2",
      label: "School",
    },
    {
      latitude: 50.07,
      longitude: 20.99,
      type: "hospital",
      id: "3",
      label: "Hospital",
    },
  ]);

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
    <div className={"relative  rounded-md overflow-hidden"}>
      <VisLeafletMap
        key={mapStyle}
        style={mapStyle}
        attribution={attribution}
        pointColor={pointColor}
        initialBounds={initialBounds}
        pointShape="ring"
        data={points}
        onMapClick={(event) => console.log(event)}
      />
    </div>
  );
};
