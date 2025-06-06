import { checkAuthAndPromptLogin, selectIsLoggedIn } from "@/store/userSlice";
import { RouterUrlEnum } from "@/types/enums";
import { useDispatch, useSelector } from "react-redux";
import { Plus, ScanQrCode, Ticket, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { AddEventDialog } from "./AddEventDialog";

export const Footer = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const isAdmin = false;

  const [isOpenAddEventDialog, setIsOpenAddEventDialog] = useState(false);

  const handleEventAdded = () => {
    // Trigger a custom event to notify Home component
    window.dispatchEvent(new CustomEvent("eventAdded"));
  };

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
            <Link
              to={isAdmin ? "#" : RouterUrlEnum.SCAN_QR}
              onClick={(e) => {
                if (isAdmin) {
                  e.preventDefault();
                  setIsOpenAddEventDialog(true);
                  return;
                }
                if (!isLoggedIn) {
                  e.preventDefault();
                  dispatch(checkAuthAndPromptLogin());
                  return;
                }
              }}
            >
              {isAdmin ? (
                <Plus className="text-secondary" />
              ) : (
                <ScanQrCode className="text-secondary" />
              )}
            </Link>
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
        onEventAdded={handleEventAdded}
      />
    </>
  );
};
