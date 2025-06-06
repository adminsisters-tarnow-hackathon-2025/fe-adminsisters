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

export const UserProfile = () => {
  const achievements = [
    {
      id: "1",
      title: "Debiutant Miejski",
      description: "Weź udział w swoim pierwszym wydarzeniu w Tarnowie.",
      badgeImage: "/src/assets/Badge1 1.svg",
      points: 20,
      progress: 50,
    },
    {
      id: "2",
      title: "Kulturalny Bywalec",
      description: "Odwiedź 5 wydarzeń kulturalnych (koncert, wystawa, teatr).",
      badgeImage: "/src/assets/Badge3 1.svg",
      points: 50,
      progress: 75,
    },
    {
      id: "3",
      title: "Społeczny Tarnowianin",
      description:
        "Weź udział w 3 wydarzeniach społecznych lub charytatywnych.",
      badgeImage: "/src/assets/Badge5 1.svg",
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
      badgeImage: "/src/assets/image 4.svg",
      points: 20,
    },
    {
      id: "2",
      title: "Karnet 5-przejazdowy",
      description: "Ważny na jednej linii.",
      badgeImage: "/src/assets/image 4.svg",
      points: 50,
    },
    {
      id: "3",
      title: "Doładowanie TKM (5 zł)",
      description: "Dodaj 5 zł na konto Tarnowskiej Karty Miejskiej.",
      badgeImage: "/src/assets/image 5.png",
      points: 50,
    },
    {
      id: "4",
      title: "Doładowanie TKM (10 zł)",
      description: "Dodaj 10 zł na konto Tarnowskiej Karty Miejskiej.",
      badgeImage: "/src/assets/image 5.png",
      points: 50,
    },
  ];

  return (
    <Tabs defaultValue="points" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="achievements">Osiągnięcia</TabsTrigger>
        <TabsTrigger value="points">Tarnowiaki</TabsTrigger>
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
              <TarnowiakCard key={redem.id} redem={redem} />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
