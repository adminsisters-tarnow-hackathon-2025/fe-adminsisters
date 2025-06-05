import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <main className=" mx-auto p-4">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
