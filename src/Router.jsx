
import { createBrowserRouter, RouterProvider } from "react-router-dom";
 import App from "./App";
import First from "./First";
import Singel from "./Singel";
 import Movies from "./Movies";
 import Tevsow from "./Tvshow"
import Tvshowid from "./Tvshowid";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { index: true, element: <App /> },
      { path: "movie/:id", element: <Singel /> },

      { path: "/tv", element: <App /> },
      { path: "/Allmovies", element: <Movies/> },
      { path: "/TvShows", element: <Tevsow/> },
     { path: "TvShowsid/:id", element: <Tvshowid/> },



    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
