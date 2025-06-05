import { ScanQrCode, Ticket, User } from "lucide-react";

export const Footer = () => {
  return (
    <>
      <nav className="border-b py-2 px-4 border-t">
        <div className="flex items-center justify-around px-4">
          <div className="rounded-full flex flex-col  items-center">
            <Ticket />
            <p>Bilety</p>
          </div>
          <div className="rounded-full bg-secondary-foreground p-4">
            <ScanQrCode className="text-secondary" />
          </div>
          <div className="rounded-full flex flex-col  items-center">
            <User />
            <p>Konto</p>
          </div>
        </div>
      </nav>
    </>
  );
};
