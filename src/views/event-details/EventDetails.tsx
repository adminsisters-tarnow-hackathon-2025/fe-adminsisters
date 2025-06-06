import { getEventByIdAsync } from "@/api/events";
import { Event } from "@/api/events/types";
import { EventStatusBadge } from "@/components/EventStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, Wallet, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const getEventStatus = (event: Event) => {
  const now = new Date();
  const dateFrom = event.dateFrom ? new Date(event.dateFrom) : null;
  const dateTo = event.dateTo ? new Date(event.dateTo) : null;

  if (dateTo && now > dateTo) return "ended";
  if (dateFrom && now >= dateFrom) return "ongoing";
  return "planned";
};

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

export const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const response = await getEventByIdAsync(id);
        if (response?.data?.data) {
          setEvent(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Card>
          <AspectRatio
            ratio={2 / 1}
            className="bg-muted rounded-md overflow-hidden mx-6"
          >
            <Skeleton className="w-full h-full" />
          </AspectRatio>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-8">
        <p>Event nie został znaleziony.</p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Powrót do głównej
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Powrót
      </Button>

      <Card>
        <AspectRatio
          ratio={2 / 1}
          className="bg-muted rounded-md overflow-hidden mx-6"
        >
          <img
            src={`https://picsum.photos/800/400?random=${
              event.id || Math.random()
            }`}
            alt={event.name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </AspectRatio>
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-2">
            <EventStatusBadge status={getEventStatus(event)} />
            {event.name}
          </CardTitle>
          <CardDescription>
            <div className="border rounded-md p-2 gap-2 flex flex-col [&>div]:flex [&>div]:items-center [&>div]:gap-4">
              <div className="text-secondary-foreground">
                <MapPin className="size-4 text-primary" />
                {event.location.name}, {event.location.address}
              </div>
              <div className="text-secondary-foreground">
                <Clock className="size-4 text-primary" />
                <div className="flex flex-col">
                  {event.dateFrom && (
                    <span>od: {formatPolishDateTime(event.dateFrom)}</span>
                  )}
                  {event.dateTo && (
                    <span>do: {formatPolishDateTime(event.dateTo)}</span>
                  )}
                </div>
              </div>
              <div className="text-secondary-foreground">
                <Wallet className="size-4 text-primary" />
                {event.price > 0
                  ? `Wstęp płatny - ${event.price} zł`
                  : "Wstęp wolny"}
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Opis wydarzenia</h3>
              <p className="text-muted-foreground whitespace-pre-wrap break-words">
                {event.shortDescription}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground whitespace-pre-wrap break-words">
                {event.longDescription}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lokalizacja</CardTitle>
          <CardDescription>
            {event.location.name} - {event.location.address}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            Adres: {event.location.address}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
