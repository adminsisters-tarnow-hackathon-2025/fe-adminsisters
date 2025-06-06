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
  latitude: z.coerce.number().min(-90).max(90, {
    message: "Szerokość geograficzna musi być między -90 a 90.",
  }),
  longitude: z.coerce.number().min(-180).max(180, {
    message: "Długość geograficzna musi być między -180 a 180.",
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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const { isSubmitting } = form.formState;

  const handleCreateLocation = async (data: CreateLocation) => {
    await createLocationAsync(data);
  };

  const onSubmit = async (values: FormData) => {
    try {
      const createLocationData: CreateLocation = {
        name: values.name,
        address: values.address,
        longitude: values.longitude,
        latitude: values.latitude,
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Szerokość geograficzna</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="50.0647"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Długość geograficzna</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="19.9450"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Tworzenie..." : "Utwórz lokalizację"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
