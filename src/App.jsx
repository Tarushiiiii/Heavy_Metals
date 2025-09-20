import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import { Layout } from './components/layout/layout';
import { PublicInfo } from './pages/public_info';
import { Reports } from './pages/reports';
import { Map } from './pages/map';
import { DataEntry } from './pages/data_entry';
import { Settings } from './pages/settings';

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/public_info" element={<PublicInfo />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/map" element={<Map />} />
            <Route path="/data_entry" element={<DataEntry />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

