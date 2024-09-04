import { Stack } from '@mui/material';
import Header from './components/header';
import Content from './components/content';

export default function Notifications() {
    return (
        <Stack
            borderTop="1px solid"
            borderColor="semantic.border.secondary"
            overflow="hidden"
            paddingBottom="10px"
        >
            <Header />

            <Content />
        </Stack>
    );
}
