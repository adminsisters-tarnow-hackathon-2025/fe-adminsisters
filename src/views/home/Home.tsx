import { getEventsAsync } from "@/api/events";
import { Event } from "@/api/events/types";
import { EventCard } from "@/components/EventCard";
import { EventCardSkeleton } from "@/components/EventCardSkeleton";
import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await getEventsAsync();
      if (response?.data?.data) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();

    // Listen for event added event
    const handleEventAdded = () => {
      fetchEvents();
    };

    window.addEventListener("eventAdded", handleEventAdded);

    return () => {
      window.removeEventListener("eventAdded", handleEventAdded);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {events.map((event, i) => (
          <EventCard event={event} key={i} />
        ))}
      </div>
    </>
  );
}
