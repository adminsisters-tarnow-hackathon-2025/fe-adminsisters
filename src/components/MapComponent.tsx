import { useTheme } from "@/hooks/useTheme";
import { VisLeafletMap } from "@unovis/react";
import { Locate } from "lucide-react";
import { useMemo, useState } from "react";
import { Location } from "@/types/models";

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

interface MapComponentProps {
  locations?: Location[];
  showSingleLocation?: boolean;
}

export const MapComponent = ({
  locations,
  showSingleLocation = false,
}: MapComponentProps) => {
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

  const [defaultPoints] = useState<MapDataRecord[]>([
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
  ] as const);

  const mapData = useMemo(() => {
    if (locations && locations.length > 0) {
      return locations.map((location) => ({
        latitude: parseFloat(location.latitude?.toString() || "0"),
        longitude: parseFloat(location.longitude?.toString() || "0"),
        name: location.name,
        address: location.address,
      }));
    }
    return defaultPoints;
  }, [locations, defaultPoints]);

  const bounds = useMemo(() => {
    if (showSingleLocation && locations && locations.length === 1) {
      const location = locations[0];
      const lat = parseFloat(location.latitude?.toString() || "50.05");
      const lng = parseFloat(location.longitude?.toString() || "20.95");
      const offset = 0.01;

      return {
        northEast: { lat: lat + offset, lng: lng + offset },
        southWest: { lat: lat - offset, lng: lng - offset },
      };
    }
    return defaultBounds;
  }, [showSingleLocation, locations, defaultBounds]);

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
        />
        {!showSingleLocation && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <Locate className="size-10 text-secondary-foreground drop-shadow-lg" />
          </div>
        )}
      </div>
    </>
  );
};
