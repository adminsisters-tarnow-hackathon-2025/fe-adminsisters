import { MapComponent } from "@/components/MapComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Map = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Map</CardTitle>
        <CardDescription>View and interact with the map below.</CardDescription>
      </CardHeader>
      <CardContent>
        <MapComponent />
      </CardContent>
    </Card>
  );
};
