import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import Header from './components/Header/Header';
import Years from './components/Years/Years';

const Container = styled(Stack)(({ theme }) => ({
    height    : '100%',
    overflow  : 'hidden',
    background: theme.palette.semantic.background.secondary
}));

export default function Ifta() {
    return (
        <Container>
            <Header />
            <Years />
        </Container>
    );
}
