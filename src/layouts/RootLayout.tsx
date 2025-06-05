import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background relative">
        <div className="sticky top-0 z-50 bg-background ">
          <Header />
        </div>
        <main className=" mx-auto p-4 relative">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
