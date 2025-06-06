import {
  checkAuthAndPromptLogin,
  selectIsLoggedIn,
  selectUser,
} from "@/store/userSlice";
import { RouterUrlEnum } from "@/types/enums";
import { Map, Plus, ScanQrCode, User } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { AddEventDialog } from "./AddEventDialog";

export const Footer = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectUser).user?.data.isAdmin || false;

  console.log(useSelector(selectUser));
  const dispatch = useDispatch();

  const [isOpenAddEventDialog, setIsOpenAddEventDialog] = useState(false);

  const handleEventAdded = () => {
    // Trigger a custom event to notify Home component
    window.dispatchEvent(new CustomEvent("eventAdded"));
  };

  return (
    <>
      <nav className="border-b py-2 px-4 border-t">
        <div className="flex items-center justify-around px-4">
          <Link
            to={RouterUrlEnum.MAP}
            className="rounded-full flex flex-col items-center p-2 w-full"
          >
            <Map
              fill={`${
                isActive(RouterUrlEnum.MAP)
                  ? "var(--color-secondary-foreground)"
                  : "none"
              }`}
            />
            <p
              className={`${
                isActive(RouterUrlEnum.MAP) ? "font-semibold" : ""
              }`}
            >
              Mapa
            </p>
          </Link>
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
            <div className="rounded-full bg-secondary-foreground p-4">
              {isAdmin ? (
                <Plus className="text-secondary" />
              ) : (
                <ScanQrCode className="text-secondary" />
              )}
            </div>
          </Link>
          <Link
            to={RouterUrlEnum.PROFILE}
            className="rounded-full flex flex-col items-center p-2 w-full"
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                dispatch(checkAuthAndPromptLogin());
                return;
              }
            }}
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
