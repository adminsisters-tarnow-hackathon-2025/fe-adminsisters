import { createEventAsync } from "@/api/events";
import { CreateEvent } from "@/api/events/types";
import { getLocationsAsync } from "@/api/locations";
import { Location } from "@/api/locations/types";
import { EVENT_CATEGORIES } from "@/types/consts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  type: z.string().min(1, {
    message: "Typ eventu jest wymagany.",
  }),
  tags: z.string().min(1, {
    message: "Tagi są wymagane.",
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
  image: z.instanceof(File).optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface AddEventDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onEventAdded?: () => void;
}

export const AddEventDialog = ({
  open = false,
  onOpenChange,
  onEventAdded,
}: AddEventDialogProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      longDescription: "",
      price: 0,
      coinReward: 0,
      type: "",
      tags: "",
      dateFrom: "",
      dateTo: "",
      locationId: "",
      image: "",
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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (values: FormData) => {
    try {
      let image: string | undefined;

      if (values.image && values.image instanceof File) {
        image = await convertFileToBase64(values.image);
      }

      const createEventData: CreateEvent = {
        name: values.name,
        shortDescription: values.shortDescription,
        longDescription: values.longDescription,
        price: values.price,
        coinReward: values.coinReward,
        type: values.type,
        tags: values.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        locationId: values.locationId,
        image,
      };

      console.log(values.dateFrom);
      console.log(values.dateTo);

      await handleCreateEvent(createEventData);

      onOpenChange?.(false);
      form.reset();
      setImagePreview(null);
      onEventAdded?.();
    } catch (error) {
      console.error(error);
      onOpenChange?.(false);
      form.reset();
      setImagePreview(null);
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zdjęcie eventu</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                        handleImageChange(file);
                      }}
                    />
                  </FormControl>
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Podgląd"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typ eventu</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz typ eventu" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EVENT_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="technologia, networking, biznes (oddziel przecinkami)"
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
