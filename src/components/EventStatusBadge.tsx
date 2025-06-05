import React from "react";
import { Badge } from "./ui/badge";

type EventStatus = "ongoing" | "planned" | "ended";

interface EventStatusBadgeProps {
  status: EventStatus;
  className?: string;
}

export const EventStatusBadge: React.FC<EventStatusBadgeProps> = ({
  status,
  className,
}) => {
  const getStatusConfig = (status: EventStatus) => {
    switch (status) {
      case "ongoing":
        return {
          text: "Trwa",
          dotColor: "bg-green-500",
        };
      case "planned":
        return {
          text: "Zaplanowany",
          dotColor: "bg-blue-500",
        };
      case "ended":
        return {
          text: "Zakończony",
          dotColor: "bg-muted-foreground",
        };
      default:
        return {
          text: status,
          dotColor: "bg-muted-foreground",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant="outline"
      className={`${className}} flex items-center gap-1 rounded-full `}
    >
      <div className={`size-3 rounded-full ${config.dotColor}`} />
      {config.text}
    </Badge>
  );
};
