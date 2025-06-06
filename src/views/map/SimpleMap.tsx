import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useRef, useMemo, useEffect } from "react";
import { getLocationsAsync } from "@/api/locations";
import { Location } from "@/api/locations/types";
import { AddLocationDialog } from "@/components/AddLocationDialog";

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
  const [draggable, setDraggable] = useState(false);
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

  const toggleDraggable = () => {
    setDraggable((d) => !d);
  };

  return (
    <Marker
      draggable={draggable}
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
          <div>
            <span className="font-medium">Współrzędne:</span>
            <br />
            Lat: {location.latitude.toFixed(6)}
            <br />
            Lng: {location.longitude.toFixed(6)}
          </div>
          <div className="pt-2 border-t">
            <span
              onClick={toggleDraggable}
              className="text-blue-600 cursor-pointer hover:underline text-sm"
            >
              {draggable ? "Wyłącz przeciąganie" : "Włącz przeciąganie"}
            </span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (latlng: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export const SimpleMap = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);

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

  const handleMapClick = (position: [number, number]) => {
    setSelectedPosition(position);
  };

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
    setSelectedPosition(null);
  };

  return (
    <Card className="w-full p-2">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Mapa lokalizacji</CardTitle>
            <CardDescription>
              Kliknij na mapę aby dodać nową lokalizację. Kliknij na znacznik
              aby zobaczyć szczegóły.
            </CardDescription>
          </div>
          <AddLocationDialog
            onLocationAdded={handleLocationAdded}
            initialPosition={selectedPosition}
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="w-full h-[500px] flex items-center justify-center border rounded-md">
            <p>Ładowanie lokalizacji...</p>
          </div>
        ) : (
          <MapContainer
            center={
              locations.length > 0
                ? [locations[0].latitude, locations[0].longitude]
                : [51.505, -0.09]
            }
            zoom={13}
            className="w-full h-[500px] rounded-md overflow-hidden border"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onMapClick={handleMapClick} />
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
