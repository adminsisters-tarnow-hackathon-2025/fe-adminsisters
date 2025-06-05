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
      <div className="min-h-screen bg-background relative">
        <div className="sticky top-0 z-50 bg-background ">
          <Header />
        </div>
        <main className=" mx-auto p-4 relative">
          <LoginDialog open={openLoginDialog} onOpenChange={handleOpenChange} />

          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
