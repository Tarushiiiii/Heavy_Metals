import { Filters } from "../ui/filters";
import SearchAutocomplete from '../ui/searchbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

export const SearchFilter = () => {
    return (
        <div className='search-filter-container'>
            <ThemeProvider theme={theme}>
                <div style={{ width: 400, padding: 2 }}>
                    <SearchAutocomplete />
                </div>
            </ThemeProvider>
            {/* <Filters options={[{ title: 'Metal' }, { title: 'Region' }, { title: 'Date Range' }]} /> */}

            <div className="flex gap-4 items-center">
                <div className="relative">
                    <select className="custom-select">
                        <option>Region</option>
                        <option>Gurgaon</option>
                        <option>Delhi</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        ▼
                    </div>
                </div>

                <div className="relative">
                    <select className="custom-select">
                        <option>This year</option>
                        <option>2025</option>
                        <option>2024</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        ▼
                    </div>
                </div>

                <div className="relative">
                    <select className="custom-select">
                        <option>Metal</option>
                        <option>Lead</option>
                        <option>Mercury</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        ▼
                    </div>
                </div>
            </div>


        </div>
    );
}