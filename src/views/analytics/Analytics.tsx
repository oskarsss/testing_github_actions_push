import { styled } from '@mui/material/styles';
import Charts from './components/Charts/Charts';

export const Container = styled('div')(({ theme }) => ({
    margin  : 0,
    width   : '100%',
    height  : '100%',
    position: 'relative',
    overflow: 'hidden',

    // backgroundColor: `${theme.palette.semantic.foreground.white.tertiary} !important`,
    backgroundColor: 'red !important'
}));

export default function Analytics() {
    return (
        <Container>
            {/* <HomeHeader /> */}
            <Charts />
        </Container>
    );
}
