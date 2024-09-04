import Stack from '@mui/material/Stack';
import Panel from './components/Panel';

export default function LeftPanel() {
    return (
        <Stack
            maxWidth="450px"
            width="100%"
            minWidth="400px"
            height="100%"
            direction="column"
        >
            <Panel />
        </Stack>
    );
}
