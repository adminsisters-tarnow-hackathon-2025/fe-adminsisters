import { MapComponent } from "@/components/MapComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Location } from "@/types/models";

interface MapProps {
  locations?: Location[];
}

export const Map = ({ locations }: MapProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa</CardTitle>
        <CardDescription>Zobacz lokalizacje na mapie.</CardDescription>
      </CardHeader>
      <CardContent>
        <MapComponent locations={locations} />
      </CardContent>
    </Card>
  );
};
