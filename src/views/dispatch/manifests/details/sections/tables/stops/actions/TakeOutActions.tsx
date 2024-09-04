import React from 'react';
import { TakeOutStop, useTakeOutStopsDialog } from '@/views/dispatch/manifests/modals/take-out';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import { Stack, Typography } from '@mui/material';
import type ManifestsTypes from '@/store/dispatch/manifests/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ActionsStyled from '@/views/dispatch/manifests/details/sections/tables/stops/actions/styled';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { TakeOutIcon } from './DefaultActions';

type Props = {
    setTableMode: (mode: TableMode) => void;
    manifestId: string;
    selectedStops: TakeOutStop[];
    preparedStops: ManifestsTypes.AnyPreparedStop[];
    setSelectedStops: React.Dispatch<React.SetStateAction<TakeOutStop[]>>;
};

export default function TakeOutActions({
    setTableMode,
    manifestId,
    selectedStops,
    preparedStops,
    setSelectedStops
}: Props) {
    const dialog = useTakeOutStopsDialog();
    const { t } = useAppTranslation();

    const allStops = preparedStops.map((stop) => ({
        id    : stop.stopId,
        loadId: stop.loadId,
        type  : stop.originType
    }));

    const onClick = () => {
        dialog.open({
            manifestId,
            stopsList            : selectedStops,
            onSuccessTakeOutStops: () => {
                setSelectedStops([]);
            }
        });
    };

    const checked = allStops.length === selectedStops.length;

    const onChange = () => {
        if (checked) {
            setSelectedStops([]);
        } else {
            setSelectedStops(allStops);
        }
    };

    return (
        <>
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="inherit"
            >
                <Checkbox
                    indeterminate={
                        selectedStops.length > 0 && selectedStops.length < allStops.length
                    }
                    onChange={onChange}
                    checked={checked}
                />

                <Typography
                    sx={{
                        color        : ({ palette }) => palette.semantic.text.brand.primary,
                        fontWeight   : 700,
                        fontSize     : '12px',
                        textTransform: 'uppercase'
                    }}
                >
                    {t('common:selected', { count: selectedStops.length })}
                </Typography>
            </Stack>

            <Stack
                flexDirection="row"
                alignItems="center"
                gap="inherit"
            >
                <ActionsStyled.Cancel onClick={setTableMode} />

                <ActionsStyled.Button
                    startIcon={<TakeOutIcon />}
                    onClick={onClick}
                    disabled={!selectedStops.length}
                    variant="contained"
                >
                    {t('modals:manifests.details.tabs.stops.header.buttons.take_out')}
                </ActionsStyled.Button>
            </Stack>
        </>
    );
}
