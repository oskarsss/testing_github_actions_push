import React from 'react';
import { TakeOutStop, useTakeOutStopsDialog } from '@/views/dispatch/manifests/modals/take-out';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import { Stack, Typography } from '@mui/material';
import type ManifestsTypes from '@/store/dispatch/manifests/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { TakeOutIcon } from '@/views/dispatch/manifests/details/sections/tables/stops/actions/DefaultActions';
import ActionsStyled from '@/@core/ui-kits/loads/load-stop/actions/ActionStyled';

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

    const indeterminate = selectedStops.length > 0 && selectedStops.length < allStops.length;

    return (
        <>
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="inherit"
            >
                <ActionsStyled.Button
                    startIcon={<TakeOutIcon />}
                    onClick={onClick}
                    disabled={!selectedStops.length}
                    variant="text"
                >
                    {t('modals:manifests.details.tabs.stops.header.buttons.take_out')}
                </ActionsStyled.Button>

                <ActionsStyled.Cancel onClick={setTableMode} />
            </Stack>

            <Stack
                flexDirection="row"
                alignItems="center"
                gap="inherit"
            >
                <Checkbox
                    indeterminate={indeterminate}
                    onChange={onChange}
                    checked={checked}
                    size="small"
                />

                <Typography
                    fontSize="12px"
                    fontWeight={500}
                    lineHeight={1.5}
                    minWidth="63px"
                    textAlign="right"
                    color={(theme) => theme.palette.semantic.text.secondary}
                >
                    {t('common:selected', { count: selectedStops.length })}
                </Typography>
            </Stack>
        </>
    );
}
