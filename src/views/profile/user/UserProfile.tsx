import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AchievementCard } from "../components/AchievementCard";
import { TarnowiakCard } from "@/components/TarnowiakCard";
import { EventCard } from "@/components/EventCard";
import { useEffect, useState } from "react";
import { getUserEventsAsync, removeCointsAsync } from "@/api/users";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setCoins } from "@/store/userSlice";
import { Event } from "@/api/events/types";

export const UserProfile = () => {
  const achievements = [
    {
      id: "1",
      title: "Debiutant Miejski",
      description: "Weź udział w swoim pierwszym wydarzeniu w Tarnowie.",
      badgeImage: "/public/Badge1 1.svg",
      points: 20,
      progress: 50,
    },
    {
      id: "2",
      title: "Kulturalny Bywalec",
      description: "Odwiedź 5 wydarzeń kulturalnych (koncert, wystawa, teatr).",
      badgeImage: "/public/Badge3 1.svg",
      points: 50,
      progress: 75,
    },
    {
      id: "3",
      title: "Społeczny Tarnowianin",
      description:
        "Weź udział w 3 wydarzeniach społecznych lub charytatywnych.",
      badgeImage: "/public/Badge5 1.svg",
      points: 50,
      progress: 75,
    },
  ];

  const TarnowiakRedems = [
    {
      id: "1",
      title: "Bilet jednorazowy",
      description:
        "Ważny na jednej linii lub 30-minutowy ważny na różnych liniach",
      badgeImage: "/public/image 4.svg",
      points: 20,
    },
    {
      id: "2",
      title: "Karnet 5-przejazdowy",
      description: "Ważny na jednej linii.",
      badgeImage: "/public/image 4.svg",
      points: 50,
    },
    {
      id: "3",
      title: "Doładowanie TKM (5 zł)",
      description: "Dodaj 5 zł na konto Tarnowskiej Karty Miejskiej.",
      badgeImage: "/public/image 5.png",
      points: 50,
    },
    {
      id: "4",
      title: "Doładowanie TKM (10 zł)",
      description: "Dodaj 10 zł na konto Tarnowskiej Karty Miejskiej.",
      badgeImage: "/public/image 5.png",
      points: 50,
    },
  ];
  const userId = useSelector(selectUser).user?.data.id;
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getUserEventsAsync(userId ?? "");
      setEvents(response?.data.data ?? []);
    };
    fetchEvents();

    const handleEventAdded = () => {
      fetchEvents();
    };

    window.addEventListener("eventAdded", handleEventAdded);

    return () => {
      window.removeEventListener("eventAdded", handleEventAdded);
    };
  }, [userId]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <Tabs defaultValue="points" className="w-full">
      <TabsList className="">
        <TabsTrigger value="achievements">Osiągnięcia</TabsTrigger>
        <TabsTrigger value="points">Tarnowiaki</TabsTrigger>
        <TabsTrigger value="your_events">Moje eventy</TabsTrigger>
      </TabsList>
      <TabsContent value="achievements">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Twoje osiągnięcia</CardTitle>
            <CardDescription>Przeglądaj swoje osiągnięcia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="points">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Wydaj Tarnowiaki</CardTitle>
            <CardDescription>
              Wydaj swoje Tarnowiaki na nagrody i zniżki w Tarnowie.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {TarnowiakRedems.map((redem) => (
              <div
                onClick={() => {
                  removeCointsAsync(userId!, 50);
                  dispatch(setCoins((user.user?.data.coinAmount || 0) - 50));
                }}
              >
                <TarnowiakCard key={redem.id} redem={redem} />
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="your_events">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Twoje wydarzenia</CardTitle>
            <CardDescription>
              Przeglądaj wydarzenia, w których bierzesz udział.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-6">
              {events.map((event, i) => (
                <EventCard event={event} key={i} />
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
