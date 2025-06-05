import { createEventAsync } from "@/api/events";
import { CreateEvent } from "@/api/events/types";
import { getLocationsAsync } from "@/api/locations";
import { Location } from "@/api/locations/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nazwa musi mieć co najmniej 2 znaki.",
  }),
  shortDescription: z.string().min(10, {
    message: "Krótki opis musi mieć co najmniej 10 znaków.",
  }),
  longDescription: z.string().min(20, {
    message: "Długi opis musi mieć co najmniej 20 znaków.",
  }),
  price: z.coerce.number().min(0, {
    message: "Cena musi być większa lub równa 0.",
  }),
  coinReward: z.coerce.number().min(0, {
    message: "Nagroda w monetach musi być większa lub równa 0.",
  }),
  image: z.string().url({
    message: "Podaj prawidłowy URL obrazu.",
  }),
  dateFrom: z.string().min(1, {
    message: "Data rozpoczęcia jest wymagana.",
  }),
  dateTo: z.string().min(1, {
    message: "Data zakończenia jest wymagana.",
  }),
  locationId: z.string().min(1, {
    message: "Lokalizacja jest wymagana.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export const AddEventDialog = () => {
  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      longDescription: "",
      price: 0,
      coinReward: 0,
      image: "",
      dateFrom: "",
      dateTo: "",
      locationId: "",
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await getLocationsAsync();
      setLocations(response?.data.data ?? []);
    };
    fetchLocations();
  }, []);

  const handleCreateEvent = async (data: CreateEvent) => {
    await createEventAsync(data);
  };

  const onSubmit = async (values: FormData) => {
    try {
      const createEventData: CreateEvent = {
        name: values.name,
        shortDescription: values.shortDescription,
        longDescription: values.longDescription,
        price: values.price,
        coinReward: values.coinReward,
        image: values.image,
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        locationId: values.locationId,
      };

      await handleCreateEvent(createEventData);

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
      setOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Dodaj event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dodaj nowy event</DialogTitle>
          <DialogDescription>
            Wprowadź szczegóły dotyczące nowego eventu.
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
                    <Input placeholder="Wprowadź nazwę eventu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Krótki opis</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Wprowadź krótki opis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Długi opis</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Wprowadź szczegółowy opis"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cena</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coinReward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nagroda (monety)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL obrazu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data rozpoczęcia</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data zakończenia</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokalizacja</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz lokalizację" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name} - {location.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Tworzenie..." : "Utwórz event"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
