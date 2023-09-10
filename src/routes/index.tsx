import { useRoutes } from "react-router-dom";

import HomePage from "@/pages/home.page";

function Routes() {
  const element = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);

  return element;
}

export default Routes;
