import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Heart, MapPin, Wallet } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const EventCard = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      <Card className="w-full h-full">
        <AspectRatio
          ratio={2 / 1}
          className="bg-muted rounded-md overflow-hidden mx-6"
        >
          <img src="/src/assets/event.png" />
        </AspectRatio>
        <CardHeader className="space-y-2">
          <CardTitle>Festyn w Waligórze</CardTitle>
          <CardDescription>
            <div className=" border rounded-md p-2  gap-2 flex flex-col [&>div]:flex [&>div]:items-center  [&>div]:gap-4 ">
              <div>
                <MapPin className="size-4" />
                Waligóra 21
              </div>
              <div>
                <Clock className="size-4" />
                12.08.2023, 14:00
              </div>
              <div>
                <Wallet className="size-4" />
                Wstęp płatny
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm">
            Zaloguj się na swoje konto, aby uzyskać dostęp do pełnego zakresu
            dostępnych funkcji dostępnych tylko dla zalogowanych użytkowników.
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center w-full gap-4">
          <Heart
            fill={isLiked ? "var(--destructive)" : "none"}
            className={`${
              isLiked ? "text-destructive" : "text-muted-foreground"
            }`}
            onClick={toggleLike}
          />
          <Button className="flex-1">Zobacz szczegóły</Button>
        </CardFooter>
      </Card>
    </>
  );
};
