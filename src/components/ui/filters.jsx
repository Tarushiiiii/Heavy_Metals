import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useCustomFilterOptions } from './CustomFilter';

export const Filters = ({ options = [] }) => {
    const filterOptions = useCustomFilterOptions({
        ignoreAccents: true,
        ignoreCase: true,
        matchFrom: 'start',
        stringify: (opt) => (typeof opt === 'string' ? opt : opt.title),
        limit: 100
    });

    return (
        <Autocomplete
            options={options}
            filterOptions={filterOptions}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.title
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Filters"
                    variant="outlined"
                />
            )}
        />
    );
};
