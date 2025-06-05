import RootLayout from "@/layouts/RootLayout";
import { RouterUrlEnum } from "@/types/enums/RouterUrlEnum";
import Home from "@/views/home/Home";
import { Map } from "@/views/map/Map";
import NotFound from "@/views/not-found/NotFound";
import { Profile } from "@/views/profile/Profile";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: RouterUrlEnum.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: RouterUrlEnum.MAP,
        element: <Map />,
      },
      {
        path: RouterUrlEnum.PROFILE,
        element: <Profile />,
      },
    ],
  },
  {
    path: RouterUrlEnum.NOT_FOUND,
    element: <NotFound />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

//eslint-disable-next-line
export default router;
