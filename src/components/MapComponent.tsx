import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/useTheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisLeafletMap } from "@unovis/react";
import { Locate } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Bounds = {
  northEast: { lat: number; lng: number };
  southWest: { lat: number; lng: number };
};
type MapDataRecord = {
  latitude: number;
  longitude: number;
  name: string;
  address: string;
};

const formSchema = z.object({
  label: z.string().min(2, {
    message: "Nazwa musi mieć co najmniej 2 znaki.",
  }),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
});

export const MapComponent = () => {
  const { theme } = useTheme();

  const apiKey = import.meta.env.VITE_LEAFLET_MAP_API_KEY;

  const attribution: string[] = [
    `<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a>`,
    `<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>`,
  ] as const;

  const [initialBounds] = useState<Bounds>({
    northEast: { lat: 50.0413, lng: 20.9991 },
    southWest: { lat: 50.0021, lng: 20.9367 },
  });
  const [points, setPoints] = useState<MapDataRecord[]>([
    {
      latitude: 50.05,
      longitude: 20.95,
      name: "Chuj",
      address: "Sample address 1",
    },
    {
      latitude: 50.07,
      longitude: 20.98,
      name: "School",
      address: "Sample address 2",
    },
    {
      latitude: 50.07,
      longitude: 20.99,
      name: "Hospital",
      address: "Sample address 3",
    },
  ]);

  const [pendingPoint, setPendingPoint] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [newPointData, setNewPointData] = useState({
    label: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      latitude: 0,
      longitude: 0,
      address: "",
    },
  });

  const handleMapClick = async ({
    mapCenter,
  }: {
    mapCenter: { lat: number; lng: number };
  }) => {
    setPendingPoint(mapCenter);
    const defaultLabel = "";
    setNewPointData({
      label: defaultLabel,
    });
    form.reset({
      label: defaultLabel,
      latitude: mapCenter.lat,
      longitude: mapCenter.lng,
      address: "",
    });
    setDialogOpen(true);
    setLoadingAddress(true);
    setAddress("");

    // Get address from coordinates using Nominatim
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${mapCenter.lat}&lon=${mapCenter.lng}&accept-language=pl`
      );
      const data = await response.json();

      if (data && data.display_name) {
        setAddress(data.display_name);
        form.setValue("address", data.display_name);
      } else {
        setAddress("Nie udało się pobrać adresu");
        form.setValue("address", "Nie udało się pobrać adresu");
      }
    } catch (error) {
      console.error("Error getting address:", error);
      setAddress("Nie udało się pobrać adresu");
      form.setValue("address", "Nie udało się pobrać adresu");
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleConfirmAdd = async (values: z.infer<typeof formSchema>) => {
    if (!pendingPoint) return;

    // Return a Promise to properly handle loading state
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newPoint: MapDataRecord = {
          latitude: values.latitude,
          longitude: values.longitude,
          name: values.label,
          address: values.address,
        };
        console.log(newPoint);
        setPoints((prevPoints) => [...prevPoints, newPoint]);

        // Reset state
        setPendingPoint(null);
        setDialogOpen(false);
        setNewPointData({ label: "" });
        form.reset();

        resolve();
      }, 500);
    });
  };

  const handleCancelAdd = () => {
    setPendingPoint(null);
    setDialogOpen(false);
    setAddress("");
    setNewPointData({ label: "" });
    form.reset();
  };

  const isDark = useMemo(() => {
    return (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme]);

  const mapStyle = useMemo(() => {
    const styleType = isDark ? "basic-v2-dark" : "basic-v2";
    return `https://api.maptiler.com/maps/${styleType}/style.json?key=${apiKey}`;
  }, [apiKey, isDark]);

  return (
    <>
      <div className={"relative  rounded-md overflow-hidden "}>
        <VisLeafletMap
          key={mapStyle}
          style={mapStyle}
          attribution={attribution}
          initialBounds={initialBounds}
          pointShape="ring"
          data={points}
          onMapClick={handleMapClick}
        />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <Locate className="size-10 text-secondary-foreground drop-shadow-lg" />
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dodaj nowy punkt</DialogTitle>
            <DialogDescription>
              Czy chcesz dodać nowy punkt w tej lokalizacji?
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleConfirmAdd)}
              className="space-y-4"
            >
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adres</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nazwa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nazwa punktu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleCancelAdd}
                  type="button"
                >
                  Anuluj
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Dodawanie..." : "Dodaj punkt"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
