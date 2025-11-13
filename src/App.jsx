import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { Dashboard } from "./pages/dashboard";
import { AboutUs } from "./pages/about_us";
import { Reports } from "./pages/reports";
import { Map } from "./pages/map";
import { CalculateHMPI } from "./pages/data_entry";
import { Settings } from "./pages/settings";
import { Analysis } from "./pages/analysis";
import { Methodology } from "./components/analysis/methodology";
import { Suggestion } from "./components/analysis/suggestions";
import  LandingPage  from "./pages/landing_page";
import NotFound from "./components/landing_page/error_404";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/user",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard />, handle: { header: "Dashboard" } },
      {
        path: "about_us",
        element: <AboutUs />,
        handle: { header: "About Us" },
      },
      { path: "reports", element: <Reports />, handle: { header: "Reports" } },
      { path: "map", element: <Map />, handle: { header: "Map" } },
      {
        path: "calculate_hmpi",
        element: <CalculateHMPI />,
        handle: { header: "Calculate HMPI" },
      },
      {
        path: "analysis",
        element: <Analysis />,
        handle: { header: "Analysis" },
      },
      {
        path: "analysis/methodology",
        element: <Methodology />,
        handle: { header: "Methodology" },
      },
      {
        path: "analysis/suggestions",
        element: <Suggestion />,
        handle: { header: "Suggestion" },
      },
      {
        path: "settings",
        element: <Settings />,
        handle: { header: "Settings" },
      },
    ],
  },
  {
    path: "*",
    element: < NotFound />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
