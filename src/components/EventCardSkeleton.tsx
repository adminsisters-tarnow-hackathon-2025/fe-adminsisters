import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const EventCardSkeleton = () => {
  return (
    <Card className="w-full h-full">
      <AspectRatio
        ratio={2 / 1}
        className="bg-muted rounded-md overflow-hidden mx-6"
      >
        <Skeleton className="w-full h-full" />
      </AspectRatio>
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-40" />
        </CardTitle>
        <CardDescription>
          <div className="border rounded-md p-2 gap-2 flex flex-col [&>div]:flex [&>div]:items-center [&>div]:gap-4">
            <div className="text-secondary-foreground">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="text-secondary-foreground">
              <Skeleton className="h-4 w-4 rounded" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="text-secondary-foreground">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center w-full gap-4">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-10 flex-1" />
      </CardFooter>
    </Card>
  );
};
