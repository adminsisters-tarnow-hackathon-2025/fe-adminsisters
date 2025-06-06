import { RouterUrlEnum } from "@/types/enums";
import { Plus, ScanQrCode, Ticket, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { AddEventDialog } from "./AddEventDialog";

export const Footer = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const isAdmin = true;

  const [isOpenAddEventDialog, setIsOpenAddEventDialog] = useState(false);
  return (
    <>
      <nav className="border-b py-2 px-4 border-t">
        <div className="flex items-center justify-around px-4">
          <div
            className={`rounded-full flex flex-col items-center p-2 w-full  ${
              isActive("/bilety") ? "bg-muted" : ""
            }`}
          >
            <Ticket />
            <p>Bilety</p>
          </div>
          <div className="rounded-full bg-secondary-foreground p-4">
            {isAdmin ? (
              <Plus
                className="text-secondary"
                onClick={() => setIsOpenAddEventDialog(true)}
              />
            ) : (
              <ScanQrCode className="text-secondary" />
            )}
          </div>
          <Link
            to={RouterUrlEnum.PROFILE}
            className="rounded-full flex flex-col items-center p-2 w-full"
          >
            <User
              fill={`${
                isActive(RouterUrlEnum.PROFILE)
                  ? "var(--color-secondary-foreground)"
                  : "none"
              }`}
            />
            <p
              className={`${
                isActive(RouterUrlEnum.PROFILE) ? "font-semibold" : ""
              }`}
            >
              Konto
            </p>
          </Link>
        </div>
      </nav>
      <AddEventDialog
        open={isOpenAddEventDialog}
        onOpenChange={setIsOpenAddEventDialog}
      />
    </>
  );
};
