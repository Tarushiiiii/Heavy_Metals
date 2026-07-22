# Heavy Metals — Frontend Application

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.1-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-API-4285F4?logo=googlemaps)](https://developers.google.com/maps)

The **Heavy Metals Frontend** is a modern React web application designed for environmental monitoring, groundwater water quality evaluation, Heavy Metal Pollution Index (HMPI) calculation, spatial geospatial mapping, and automated PDF report generation.

---

## Key Features

- **HMPI Calculation Suite**: Input individual water sample parameters or upload bulk CSV/Excel datasets for automated multi-agent AI pipeline analysis.
- **Interactive Data Analytics**: Dynamic visualizations powered by **Chart.js** and **Recharts**, featuring radar charts for Composite Index, concentration breakdowns, pie charts, and KaTeX mathematical equation renderings.
- **Geospatial Mapping**: High-definition Google Maps interface (`@react-google-maps/api`) featuring customized risk radius indicators centered around high-risk zones, interactive popups, and **OpenStreetMap Nominatim** reverse geocoding.
- **Single-Page PDF Exporter**: Instant client-side PDF export built with **jsPDF** and **html2canvas**, capturing HMPI scores, composite index radars, and risk severity status legends.
- **EcoMitigate AI Chatbot**: Floating conversational assistant interface connected to the Gemini-powered RAG backend for immediate remediation advice and scientific citations.
- **RAG Remediation Knowledge Hub**: Filterable database of heavy metal contaminants (Lead, Arsenic, Cadmium, Chromium, Nickel, etc.) providing immediate response steps, long-term monitoring strategies, and verified arXiv/DOI citations.

---

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: TailwindCSS v4 & Lucide React icons
- **State Management**: Zustand
- **Routing**: React Router v7
- **Charts & Math**: Chart.js, Recharts, D3.js, KaTeX (`react-katex`)
- **Maps**: Google Maps JS API (`@react-google-maps/api`, `@vis.gl/react-google-maps`)
- **PDF Generation**: `jspdf`, `html2canvas`, `file-saver`
- **Form Handling & Validation**: `react-hook-form`, `zod`
- **HTTP Client**: `axios`

---

## Environment Configuration

Create a `.env` file in the `frontend/` directory with the following environment variables:

```env
# Google Maps JavaScript API Key (required for Interactive Map view)
VITE_REACT_APP_GOOGLE_MAPS_API_KEY="your_google_maps_api_key"

# FastAPI Backend Service URL
VITE_BACKEND_URL="http://127.0.0.1:8000"
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server:

```bash
npm run dev
```

The web application will be accessible at: **`http://localhost:5173`**

### Build for Production

To create an optimized production build:

```bash
npm run build
```

To preview the built application locally:

```bash
npm run preview
```

---

## Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── analysis/       # RAG Suggestions & Methodology cards
│   │   ├── calculate/      # Parameter input forms & bulk dataset uploader
│   │   ├── chatbot/        # EcoMitigate AI floating chatbot drawer
│   │   ├── graphs/         # Google Maps (EnhancedGeoTag), Pie, & Composite Charts
│   │   ├── layout/         # Header navigation, Footer, Sidebar, Error Boundaries
│   │   └── ui/             # Reusable Buttons, Cards, Modals, Badges
│   ├── pages/
│   │   ├── landing_page.jsx# Platform introduction & features overview
│   │   ├── calculate.jsx   # Single sample & bulk HMPI computation tool
│   │   ├── analysis.jsx    # Environmental analysis, risk scores & breakdown
│   │   ├── map.jsx         # Geospatial interactive Google Map
│   │   ├── reports.jsx     # Downloadable PDF report preview & management
│   │   └── about_us.jsx    # Team & project methodology details
│   ├── store/              # Zustand global state (HMPI state, results, reports)
│   ├── utils/
│   │   ├── functions/      # Utility helpers, PDF exporter, API wrappers
│   │   └── constants/      # Contaminant threshold constants
│   ├── App.jsx             # React Router route definitions & app layout wrapper
│   └── main.jsx            # Application entry point
├── dist/                   # Production build output
├── public/                 # Static assets
├── package.json            # Node.js project manifest & scripts
├── vite.config.js          # Vite build configuration
└── tailwind.config.js      # TailwindCSS styling config
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Launches dev server at `http://localhost:5173` |
| `npm run build` | Builds optimized application bundle to `/dist` |
| `npm run preview` | Serves production build locally for verification |
| `npm run lint` | Runs ESLint to check for code quality and syntax errors |

---

### Developed by Team CodeBlooded
*Building intelligent environmental software for cleaner water resources.*