import { getLocationsAsync, deleteLocationAsync } from "@/api/locations";
import { getEventsAsync, deleteEventAsync } from "@/api/events";
import { Location } from "@/api/locations/types";
import { Event } from "@/api/events/types";
import { AddEventDialog } from "@/components/AddEventDialog";
import { AddLocationDialog } from "@/components/AddLocationDialog";
import { LocationsTable } from "@/components/LocationsTable";
import { EventsTable } from "@/components/EventsTable";
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
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEventsLoading, setIsEventsLoading] = useState(false);

  const fetchLocations = async () => {
    setIsLoading(true);
    const reponse = await getLocationsAsync();
    setLocations(reponse?.data.data ?? []);
    setIsLoading(false);
  };

  const fetchEvents = async () => {
    setIsEventsLoading(true);
    const response = await getEventsAsync();
    setEvents(response?.data.data ?? []);
    setIsEventsLoading(false);
  };

  const deleteLocation = async (location: Location) => {
    await deleteLocationAsync(location.id);
    await fetchLocations();
  };

  const deleteEvent = async (event: Event) => {
    await deleteEventAsync(event.id);
    await fetchEvents();
  };

  useEffect(() => {
    fetchLocations();
    fetchEvents();
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
              // @ts-expect-error asdf
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
              Tutaj możesz dodawać, edytować i usuwać eventy. Kliknij przycisk
              poniżej, aby dodać nowy event.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AddEventDialog onEventAdded={fetchEvents} />
            {isEventsLoading ? (
              <SkeletonTable />
            ) : (
              <EventsTable events={events} onDelete={deleteEvent} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
