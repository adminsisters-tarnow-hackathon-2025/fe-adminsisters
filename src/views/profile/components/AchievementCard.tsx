import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AchievementProgressChart } from "./AchievmentProgressChart";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeImage: string;
  progress: number;
  points?: number; // Optional, if not always present
}

export const AchievementCard: React.FC<{ achievement: Achievement }> = ({
  achievement,
}) => {
  return (
    <Card>
      <CardContent className="flex items-center w-full">
        <img src={achievement.badgeImage} alt={achievement.title} />
        <div className="w-full">
          <CardHeader>
            <CardTitle>{achievement.title}</CardTitle>
            <CardDescription>{achievement.description}</CardDescription>
          </CardHeader>
        </div>
        <div className="flex flex-col gap-2 items-center justify-end ">
          <AchievementProgressChart progress={achievement.progress} />
          <Badge variant={"outline"} className=" py-1 bg-background">
            +{achievement.points} <img src="/src/assets/Tarnowiak.svg" alt="" />
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
