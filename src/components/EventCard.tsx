import { Event } from "@/api/events/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { selectIsLoggedIn, checkAuthAndPromptLogin } from "@/store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Clock, Heart, MapPin, Wallet } from "lucide-react";
import React, { useState } from "react";
import { EventStatusBadge } from "./EventStatusBadge";
import { Button } from "./ui/button";

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

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleLike = () => {
    if (!isLoggedIn) {
      dispatch(checkAuthAndPromptLogin());
      return;
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <Card className="w-full h-full">
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
            <div className=" border rounded-md p-2  gap-2 flex flex-col [&>div]:flex [&>div]:items-center  [&>div]:gap-4 ">
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
                {event.price > 0 ? "Wstęp płatny" : "Wstęp wolny"}
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm">
            {event.longDescription}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center w-full gap-4">
          <Heart
            fill={isLiked ? "var(--destructive)" : "none"}
            className={`${
              isLiked ? "text-destructive" : "text-muted-foreground"
            } cursor-pointer`}
            onClick={toggleLike}
          />
          <Button className="flex-1">Zobacz szczegóły</Button>
        </CardFooter>
      </Card>
    </>
  );
};
