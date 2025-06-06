import { getLocationsAsync } from "@/api/locations";
import { Location } from "@/api/locations/types";
import { AddLocationDialog } from "@/components/AddLocationDialog";
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
}: {
  location: Location;
  onPositionChange: (id: string, pos: [number, number]) => void;
}) {
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
      <Popup minWidth={200}>
        <div className="space-y-2">
          <div>
            <strong className="text-lg">{location.name}</strong>
          </div>
          <div>
            <span className="font-medium">Adres:</span> {location.address}
          </div>
          {location.name}
        </div>
      </Popup>
    </Marker>
  );
}

export const SimpleMap = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await getLocationsAsync();
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

  const handleLocationAdded = () => {
    fetchLocations();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa lokalizacji</CardTitle>
        <CardDescription>
          Kliknij na mapę aby dodać nową lokalizację. Kliknij na znacznik aby
          zobaczyć szczegóły.
        </CardDescription>
        <div className="mt-2 ">
          <AddLocationDialog onLocationAdded={handleLocationAdded} />
        </div>
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
              />
            ))}
          </MapContainer>
        )}
      </CardContent>
    </Card>
  );
};
