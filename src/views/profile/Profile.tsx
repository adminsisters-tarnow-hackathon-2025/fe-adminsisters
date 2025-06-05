import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AchievementCard } from "./components/AchievementCard";

export const Profile = () => {
  const achievements = [
    {
      id: "1",
      title: "Achievement Title",
      description: "Description of the achievement goes here.",
      badgeImage: "/src/assets/Badge1 1.svg",
      points: 20,
      progress: 50,
    },
    {
      id: "2",
      title: "Another Achievement",
      description: "This is another achievement description.",
      badgeImage: "/src/assets/Badge3 1.svg",
      points: 50,
      progress: 75,
    },
    {
      id: "2",
      title: "Another Achievement",
      description: "This is another achievement description.",
      badgeImage: "/src/assets/Badge5 1.svg",
      points: 50,
      progress: 75,
    },
  ];

  return (
    <>
      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="achievements">Osiągnięcia</TabsTrigger>
          <TabsTrigger value="points">Tarnowiaki</TabsTrigger>
        </TabsList>
        <TabsContent value="achievements">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your profile settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="points">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Adjust your account settings.</CardDescription>
            </CardHeader>
            <CardContent>{/* Settings content goes here */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};
