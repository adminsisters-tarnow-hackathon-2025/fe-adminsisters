import { Location } from "@/types/models";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapComponent } from "./MapComponent";

interface ViewLocationDialogProps {
  location: Location | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewLocationDialog = ({
  location,
  open,
  onOpenChange,
}: ViewLocationDialogProps) => {
  if (!location) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{location.name}</DialogTitle>
          <DialogDescription>{location.address}</DialogDescription>
        </DialogHeader>
        <div className="h-[400px]">
          <MapComponent locations={[location]} showSingleLocation={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
