import React from 'react';
import LoadboardHeader from '@/views/loadboard/components/header/LoadboardHeader';
import { Stack } from '@mui/material';
import ErrorScreen from '@/@core/ui-kits/error-screen/ErrorScreen';
import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { ErrorScreenType } from '@/@core/ui-kits/error-screen/error-screen-config';
import LoadboardContent from './LoadboardContent';
import { useAddSearchDialog } from './dialogs/searches/AddSearch';

export default function Loadboard() {
    const {
        data,
        isLoading
    } = LoadboardGrpcService.useGetSearchesQuery({});

    const addSearchDialog = useAddSearchDialog();

    if (isLoading) {
        return (
            <Preloader
                sx={{
                    height: '100%',
                    width : '100%'
                }}
            />
        );
    }
    if (!data?.searches.length) {
        return (
            <Stack
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
            >
                <ErrorScreen
                    configType={ErrorScreenType.LOADBOARD_NO_SEARCHES}
                    onClick={() => addSearchDialog.open({})}
                />
            </Stack>
        );
    }

    return (
        <Stack
            flex="1 1 100%"
            overflow="hidden"
        >
            <LoadboardHeader />

            <LoadboardContent />
        </Stack>
    );
}
