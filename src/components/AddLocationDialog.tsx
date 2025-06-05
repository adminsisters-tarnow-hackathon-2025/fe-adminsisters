import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { fromAddress, OutputFormat, setDefaults } from "react-geocode";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { createLocationAsync } from "@/api/locations";
import { CreateLocation } from "@/api/locations/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nazwa musi mieć co najmniej 2 znaki.",
  }),
  address: z.string().min(1, {
    message: "Adres jest wymagany.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export const AddLocationDialog = () => {
  const [coordinates, setCoordinates] = useState<{
    longitude: number;
    latitude: number;
  }>({
    longitude: 0,
    latitude: 0,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleCreateLocation = async (data: CreateLocation) => {
    await createLocationAsync(data);
  };

  const onSubmit = (values: FormData) => {
    fromAddress(values.address)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        console.log(lat, lng);
        setCoordinates({
          longitude: lng,
          latitude: lat,
        });
      })
      .catch(console.error);

    const createLocationData: CreateLocation = {
      name: values.name,
      address: values.address,
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
    };

    handleCreateLocation(createLocationData);

    setDefaults({
      key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      language: "pl",
      region: "pl",
      outputFormat: OutputFormat.JSON,
    });
  };

  console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Dodaj lokalizację</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dodaj nową lokalizację</DialogTitle>
          <DialogDescription>
            Wprowadź szczegóły dotyczące nowej lokalizacji.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa</FormLabel>
                  <FormControl>
                    <Input placeholder="Wprowadź nazwę" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres</FormLabel>
                  <FormControl>
                    <Input placeholder="Wprowadź adres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Tworzenie..." : "Utwórz lokalizację"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
