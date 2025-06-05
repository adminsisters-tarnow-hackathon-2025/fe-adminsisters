import { useTheme } from "@/hooks/useTheme";
import { VisLeafletMap } from "@unovis/react";
import { Locate } from "lucide-react";
import { useMemo, useState } from "react";

type Bounds = {
  northEast: { lat: number; lng: number };
  southWest: { lat: number; lng: number };
};
type MapDataRecord = {
  latitude: number;
  longitude: number;
  name: string;
  address: string;
};

export const MapComponent = () => {
  const { theme } = useTheme();

  const apiKey = import.meta.env.VITE_LEAFLET_MAP_API_KEY;

  const attribution: string[] = [
    `<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a>`,
    `<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>`,
  ] as const;

  const [initialBounds] = useState<Bounds>({
    northEast: { lat: 50.0413, lng: 20.9991 },
    southWest: { lat: 50.0021, lng: 20.9367 },
  });
  const [points, setPoints] = useState<MapDataRecord[]>([
    {
      latitude: 50.05,
      longitude: 20.95,
      name: "Chuj",
      address: "Sample address 1",
    },
    {
      latitude: 50.07,
      longitude: 20.98,
      name: "School",
      address: "Sample address 2",
    },
    {
      latitude: 50.07,
      longitude: 20.99,
      name: "Hospital",
      address: "Sample address 3",
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
    <>
      <div className={"relative  rounded-md overflow-hidden "}>
        <VisLeafletMap
          key={mapStyle}
          style={mapStyle}
          attribution={attribution}
          initialBounds={initialBounds}
          pointShape="ring"
          data={points}
        />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <Locate className="size-10 text-secondary-foreground drop-shadow-lg" />
        </div>
      </div>
    </>
  );
};
