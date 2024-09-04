import { Box } from '@mui/material';
import SearchesTabs from '../searches-tabs/SearchesTabs';
import LoadboardFiltersContainer from '../filters/LoadboardFiltersContainer';

export default function LoadboardHeader() {
    return (
        <Box
            sx={{
                display      : 'column',
                flexDirection: 'column',
                alignItems   : 'flex-start'
            }}
        >
            <SearchesTabs />
            <LoadboardFiltersContainer />
        </Box>
    );
}
