import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { Dashboard } from './pages/dashboard';
import { PublicInfo } from './pages/public_info';
import { Reports } from './pages/reports';
import { Map } from './pages/map';
import { DataEntry } from './pages/data_entry';
import { Settings } from './pages/settings';
import { Analysis } from './pages/analysis';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard />, handle: { header: 'Dashboard' } },
      { path: "public_info", element: <PublicInfo />, handle: { header: 'Public Info' } },
      { path: "reports", element: <Reports />, handle: { header: 'Reports' } },
      { path: "map", element: <Map />, handle: { header: 'Map' } },
      { path: "data_entry", element: <DataEntry />, handle: { header: 'Data Entry' } },
      { path: "analysis", element: <Analysis />, handle: { header: 'Analysis' } },
      { path: "settings", element: <Settings />, handle: { header: 'Settings' } },
      { path: "*", element: <h1>Not Found</h1> },
    ]
  }
]);

export const App = () => {
  return <RouterProvider router={router} />;
};