import { createLocationAsync } from "@/api/locations";
import { CreateLocation } from "@/api/locations/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { fromAddress, OutputFormat, setDefaults } from "react-geocode";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nazwa musi mieć co najmniej 2 znaki.",
  }),
  address: z.string().min(1, {
    message: "Adres jest wymagany.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface AddLocationDialogProps {
  onLocationAdded?: () => void;
}

export const AddLocationDialog = ({
  onLocationAdded,
}: AddLocationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [, setCoordinates] = useState<{
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

  useState(() => {
    setDefaults({
      key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      language: "pl",
      region: "pl",
      outputFormat: OutputFormat.JSON,
    });
  });

  const handleCreateLocation = async (data: CreateLocation) => {
    await createLocationAsync(data);
  };

  const onSubmit = async (values: FormData) => {
    try {
      const response = await fromAddress(values.address);
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);

      const newCoordinates = {
        longitude: lng,
        latitude: lat,
      };
      setCoordinates(newCoordinates);

      const createLocationData: CreateLocation = {
        name: values.name,
        address: values.address,
        longitude: newCoordinates.longitude,
        latitude: newCoordinates.latitude,
      };

      await handleCreateLocation(createLocationData);

      setOpen(false);
      form.reset();
      onLocationAdded?.();
    } catch (error) {
      console.error(error);
      setOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-green-500/50! text-green-500/50"
        >
          Dodaj lokalizację
        </Button>
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
