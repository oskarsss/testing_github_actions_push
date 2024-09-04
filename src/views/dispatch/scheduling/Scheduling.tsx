import { styled } from '@mui/material/styles';
import { PageWrapper } from '@/@core/components/page/components';
import { useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import { LoadsActions } from '@/store/dispatch/loads/slice';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import QueryStringCover from './QueryStringCover';

const Container = styled(PageWrapper)(({ theme }) => ({
    position       : 'relative',
    backgroundColor: theme.palette.semantic.background.white
}));

export default function Scheduling() {
    const dispatch = useAppDispatch();

    useEffect(
        () => () => {
            dispatch(LoadsActions.ResetSelectedLoad());
        },
        [dispatch]
    );
    return (
        <Container>
            <QueryStringCover />
            <Header />
            <Table />
        </Container>
    );
}
