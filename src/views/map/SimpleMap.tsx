import {
  deleteLocationAsync,
  getLocationsWithEventsAsync,
} from "@/api/locations";
import { LocationWithEvents } from "@/api/locations/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router";

// Fix for default markers in Leaflet with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function DraggableMarker({
  location,
  onPositionChange,
  onDelete,
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

  const handleDelete = async () => {
    if (confirm(`Czy na pewno chcesz usunąć lokalizację "${location.name}"?`)) {
      try {
        await deleteLocationAsync(location.id);
        onDelete(location.id);
      } catch (error) {
        console.error("Failed to delete location:", error);
      }
    }
  };

  return (
    <Marker
      eventHandlers={eventHandlers}
      position={[location.latitude, location.longitude]}
      ref={markerRef}
    >
      <Popup minWidth={250}>
        <div className="space-y-2">
          <div>
            <strong className="text-lg">{location.name}</strong>
          </div>
          <div>
            <span className="font-medium">Adres:</span> {location.address}
          </div>

          {location.events && location.events.length > 0 && (
            <div className="pt-2 border-t">
              <span className="font-medium">Wydarzenia w tej lokalizacji:</span>
              <div className="mt-1 space-y-1">
                {location.events.map((event) => (
                  <div key={event.id}>
                    <button
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm cursor-pointer"
                    >
                      {event.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="w-fit border-destructive/50 text-destructive"
            >
              Usuń lokalizację
            </Button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export const SimpleMap = () => {
  const [locations, setLocations] = useState<LocationWithEvents[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await getLocationsWithEventsAsync();
      setLocations(response?.data.data ?? []);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

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
        {loading ? (
          <div className="w-full h-[500px] flex items-center justify-center border rounded-md">
            <p>Ładowanie lokalizacji...</p>
          </div>
        ) : (
          <MapContainer
            center={[50.0124, 20.9883]}
            zoom={13}
            className="w-full h-[500px] rounded-md overflow-hidden border"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
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
