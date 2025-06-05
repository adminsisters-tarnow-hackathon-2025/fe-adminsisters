import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <main className=" mx-auto p-4 relative">
          <Badge
            variant={"outline"}
            className="fixed top-4 right-4 z-50 bg-background/95 backdrop-blur-2xl py-1"
          >
            123 <img src="/src/assets/Tarnowiak.svg" alt="" />
          </Badge>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
