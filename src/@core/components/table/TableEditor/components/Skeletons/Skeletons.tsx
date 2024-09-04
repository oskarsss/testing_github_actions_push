import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Header from './components/Header';
import TableView from './components/TableView/TableView';
import ReorderColumns from './components/ReorderColumns/ReorderColumns';

export default function Skeletons() {
    return (
        <Box sx={{ padding: '28px 48px 48px 48px' }}>
            <Header />
            <Grid
                container
                spacing={5}
            >
                <Grid
                    item
                    xs={4}
                >
                    <TableView />
                </Grid>
                <Grid
                    item
                    xs={8}
                >
                    <ReorderColumns />
                </Grid>
            </Grid>
        </Box>
    );
}
