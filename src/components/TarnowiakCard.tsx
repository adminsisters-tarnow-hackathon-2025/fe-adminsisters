import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeImage: string;
  progress?: number; // Made optional
  points?: number; // Optional, if not always present
}

export const TarnowiakCard: React.FC<{ redem: Achievement }> = ({ redem }) => {
  return (
    <Card>
      <CardContent className="flex items-center w-full">
        <img src={redem.badgeImage} alt={redem.title} />
        <div className="w-full">
          <CardHeader>
            <CardTitle>{redem.title}</CardTitle>
            <CardDescription>{redem.description}</CardDescription>
          </CardHeader>
        </div>
        <div className="flex flex-col gap-2 items-center justify-end ">
          <Badge variant={"outline"} className=" py-1 px-4! w-fit">
            -{redem.points} <img src="/src/assets/Tarnowiak.svg" alt="" />
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
