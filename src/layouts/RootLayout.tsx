import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LoginDialog } from "@/components/LoginDialog";
import { ThemeProvider } from "@/components/ThemeProvider";
import { selectOpenLoginDialog, setOpenLoginDialog } from "@/store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router";

export default function RootLayout() {
  const dispatch = useDispatch();
  const openLoginDialog = useSelector(selectOpenLoginDialog);

  const handleOpenChange = (open: boolean) => {
    dispatch(setOpenLoginDialog(open));
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background relative flex flex-col">
        <div className="sticky top-0 z-50 bg-background ">
          <Header />
        </div>
        <main className="flex-1  p-4  ">
          <LoginDialog open={openLoginDialog} onOpenChange={handleOpenChange} />
          <Outlet />
        </main>
        <div className="sticky bottom-0 w-full z-50 bg-background mt-auto">
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
