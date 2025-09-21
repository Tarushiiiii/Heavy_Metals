import { Filters } from "../ui/filters";
import { SearchBar } from "../ui/searchbar";

export const SearchFilter = () => {
    return (
        <div className='search-filter-container'>
            <SearchBar />
            <Filters />
        </div>
    );
}