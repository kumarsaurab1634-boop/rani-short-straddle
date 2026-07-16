import Dashboard from "./pages/Dashboard";
import CommonLayout from "./layout/CommonLayout";

const routes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
];

export default routes;
