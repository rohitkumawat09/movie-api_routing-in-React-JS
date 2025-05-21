
import { createBrowserRouter, RouterProvider } from "react-router-dom";
 import App from "./App";
import First from "./First";
import Singel from "./Singel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { index: true, element: <App /> },
      { path: "movie/:id", element: <Singel /> },

      { path: "/tv", element: <App /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
