import { getLocationsAsync, deleteLocationAsync } from "@/api/locations";
import { Location } from "@/api/locations/types";
import { AddEventDialog } from "@/components/AddEventDialog";
import { AddLocationDialog } from "@/components/AddLocationDialog";
import { LocationsTable } from "@/components/LocationsTable";
import { SkeletonTable } from "@/components/table/skeleton-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export const AdminProfile = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocations = async () => {
    setIsLoading(true);
    const reponse = await getLocationsAsync();
    setLocations(reponse?.data.data ?? []);
    setIsLoading(false);
  };

  const deleteLocation = async (location: Location) => {
    await deleteLocationAsync(location.id);
    await fetchLocations();
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <Tabs defaultValue="locations" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="locations">Lokalizacje</TabsTrigger>
        <TabsTrigger value="events">Eventy</TabsTrigger>
      </TabsList>
      <TabsContent value="locations">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Zarządzanie lokalizacjami</CardTitle>
            <CardDescription>
              Tutaj możesz dodawać, edytować i usuwać lokalizacje. Kliknij
              przycisk poniżej, aby dodać nową lokalizację.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AddLocationDialog onLocationAdded={fetchLocations} />
            {isLoading ? (
              <SkeletonTable />
            ) : (
              <LocationsTable locations={locations} onDelete={deleteLocation} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="events">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Zarządzanie eventami</CardTitle>
            <CardDescription>
              Tutaj możesz zarządzać eventami. Funkcjonalność ta jest w budowie.
              Wkrótce pojawią się tutaj opcje dodawania, edytowania i usuwania
              eventów.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddEventDialog onEventAdded={fetchLocations} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
