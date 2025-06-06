import { getLocationsWithEventsAsync } from "@/api/locations";
import { LocationWithEvents } from "@/api/locations/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/useTheme";
// @ts-expect-error sadf
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Clock, MapPin } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router";

// Fix for default markers in Leaflet with Webpack
delete (Icon.Default.prototype as unknown as { _getIconUrl: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const formatPolishDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function DraggableMarker({
  location,
  onPositionChange,
}: {
  location: LocationWithEvents;
  onPositionChange: (id: string, pos: [number, number]) => void;
  onDelete: (id: string) => void;
}) {
  const navigate = useNavigate();
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos: [number, number] = [
            marker.getLatLng().lat,
            marker.getLatLng().lng,
          ];
          onPositionChange(location.id, newPos);
        }
      },
    }),
    [location.id, onPositionChange]
  );

  return (
    <Marker
      eventHandlers={eventHandlers}
      position={[location.latitude, location.longitude]}
      ref={markerRef}
    >
      {/* @ts-expect-error sadf */}
      <Popup minWidth={280} className="leaflet-popup-card">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              {location.name}
            </CardTitle>
            <CardDescription className="text-sm">
              {location.address}
            </CardDescription>
          </CardHeader>
          {location.events && location.events.length > 0 && (
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium py-0 ">
                  Wydarzenia w tej lokalizacji:
                </p>
                <div className="space-y-3">
                  {location.events.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-md p-2 space-y-2"
                    >
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => navigate(`/events/${event.id}`)}
                        className="h-auto p-0 text-blue-600 hover:text-blue-800 text-sm justify-start font-medium truncate max-w-[200px]"
                      >
                        {event.name}
                      </Button>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        <div className="flex flex-col">
                          {event.dateFrom && (
                            <span>
                              od: {formatPolishDateTime(event.dateFrom)}
                            </span>
                          )}
                          {event.dateTo && (
                            <span>
                              do: {formatPolishDateTime(event.dateTo)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </Popup>
    </Marker>
  );
}

export const SimpleMap = () => {
  const { theme } = useTheme();
  const [locations, setLocations] = useState<LocationWithEvents[]>([]);
  const [allLocations, setAllLocations] = useState<LocationWithEvents[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const apiKey = import.meta.env.VITE_LEAFLET_MAP_API_KEY;

  const isDark = useMemo(() => {
    return (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme]);

  const tileUrl = useMemo(() => {
    if (apiKey) {
      const styleType = isDark ? "basic-v2-dark" : "basic-v2";
      return `https://api.maptiler.com/maps/${styleType}/{z}/{x}/{y}.png?key=${apiKey}`;
    }
    return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  }, [apiKey, isDark]);

  const attribution = useMemo(() => {
    if (apiKey) {
      return '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    }
    return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  }, [apiKey]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await getLocationsWithEventsAsync();
      const fetchedLocations = response?.data.data ?? [];
      setAllLocations(fetchedLocations);
      setLocations(fetchedLocations);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Filter locations based on date range
  useEffect(() => {
    if (!dateFrom && !dateTo) {
      setLocations(allLocations);
      return;
    }

    const filtered = allLocations.filter((location) => {
      if (!location.events || location.events.length === 0) return false;

      return location.events.some((event) => {
        const eventDateFrom = new Date(event.dateFrom);
        const eventDateTo = new Date(event.dateTo);
        const filterFrom = dateFrom ? new Date(dateFrom) : null;
        const filterTo = dateTo ? new Date(dateTo) : null;

        // Check if event date range overlaps with filter date range
        if (filterFrom && filterTo) {
          return eventDateFrom <= filterTo && eventDateTo >= filterFrom;
        } else if (filterFrom) {
          return eventDateTo >= filterFrom;
        } else if (filterTo) {
          return eventDateFrom <= filterTo;
        }
        return true;
      });
    });

    setLocations(filtered);
  }, [dateFrom, dateTo, allLocations]);

  const updateMarkerPosition = (id: string, position: [number, number]) => {
    setLocations((prev) =>
      prev.map((location) =>
        location.id === id
          ? { ...location, latitude: position[0], longitude: position[1] }
          : location
      )
    );
  };

  const handleLocationDelete = (id: string) => {
    setLocations((prev) => prev.filter((location) => location.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa lokalizacji</CardTitle>
        <CardDescription>
          Lokalizacje z zaplanowanymi lub trwającymi wydarzeniami. Kliknij na
          znacznik aby zobaczyć szczegóły.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <Label className="text-sm font-medium">
            Filtruj po dacie wydarzeń:
          </Label>
          <div className="flex flex-col gap-2">
            <div className="space-y-1">
              <Label
                htmlFor="dateFrom"
                className="text-xs text-muted-foreground"
              >
                Od daty:
              </Label>
              <Input
                id="dateFrom"
                type="datetime-local"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="text-sm w-fit"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="dateTo" className="text-xs text-muted-foreground">
                Do daty:
              </Label>
              <Input
                id="dateTo"
                type="datetime-local"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="text-sm w-fit"
              />
            </div>
          </div>
          {(dateFrom || dateTo) && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Wyświetlane lokalizacje: {locations.length} z{" "}
                {allLocations.length}
              </span>
              <button
                onClick={() => {
                  setDateFrom("");
                  setDateTo("");
                }}
                className="text-blue-600 hover:underline"
              >
                Wyczyść filtry
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="w-full h-[500px] flex items-center justify-center border rounded-md">
            <p>Ładowanie lokalizacji...</p>
          </div>
        ) : (
          <MapContainer
            // @ts-expect-error sadf
            center={[50.0124, 20.9883]}
            zoom={13}
            className="w-full h-[500px] rounded-md overflow-hidden "
            key={`${tileUrl}-${isDark}`} // Force re-render when theme changes
          >
            {/* @ts-expect-error sadf */}
            <TileLayer attribution={attribution} url={tileUrl} />
            {locations.map((location) => (
              <DraggableMarker
                key={location.id}
                location={location}
                onPositionChange={updateMarkerPosition}
                onDelete={handleLocationDelete}
              />
            ))}
          </MapContainer>
        )}
      </CardContent>
    </Card>
  );
};
