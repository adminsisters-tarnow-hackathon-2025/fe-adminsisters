import { RouterUrlEnum } from "@/types/enums";
import { ScanQrCode, Ticket, User } from "lucide-react";
import { Link, useLocation } from "react-router";

export const Footer = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
            <ScanQrCode className="text-secondary" />
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
    </>
  );
};
