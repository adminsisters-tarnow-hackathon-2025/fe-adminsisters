import { AddLocationDialog } from "@/components/AddLocationDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminProfile = () => {
  return (
    <Tabs defaultValue="achievements" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="achievements">Osiągnięcia</TabsTrigger>
        <TabsTrigger value="points">Tarnowiaki</TabsTrigger>
      </TabsList>
      <TabsContent value="achievements">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Admin Panel</CardTitle>
            <CardDescription>
              Administrator dashboard and settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddLocationDialog />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
