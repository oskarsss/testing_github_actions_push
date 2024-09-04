/* eslint-disable max-len */

import { Collapse, Stack, Typography } from '@mui/material';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import React, { useEffect, useMemo, useState } from 'react';
import WarningAlert from '@/@core/ui-kits/basic/warning-alert/WarningAlert';
import { getPrepareStops } from '@/@grpcServices/services/manifests-service/utils';
import { TakeOutStop } from '@/views/dispatch/manifests/modals/take-out';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ManifestsStops from 'src/views/dispatch/manifests/details/sections/tables/stops/table';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import ManifestDetailsIcons from '../../../icons';
import { ManifestDetailsStyled } from '../styled';
import DefaultActions from './actions/DefaultActions';
import TakeOutActions from './actions/TakeOutActions';
import EditRouteActions from './actions/EditRouteActions';

type Props = {
    stops: ManifestModel_Manifest['stops'];
    manifestId: string;
    driverId: string;
    truckId: string;
    onCloseDialog?: () => void;
};

export default function ManifestDetailsStopsTable({
    stops,
    manifestId,
    driverId,
    truckId,
    onCloseDialog
}: Props) {
    const { t } = useAppTranslation('modals');
    const [tableMode, setTableMode] = useState<TableMode>(TableMode.NONE);
    const [preparedStops, setPreparedStops] = useState(getPrepareStops(stops));
    const [selectedStops, setSelectedStops] = useState<TakeOutStop[]>([]);

    const isEqualStopsSequence = useMemo(
        () => JSON.stringify(preparedStops) === JSON.stringify(getPrepareStops(stops)),
        [preparedStops, stops]
    );

    useEffect(() => {
        if (JSON.stringify(preparedStops) !== JSON.stringify(getPrepareStops(stops))) {
            setPreparedStops(getPrepareStops(stops));
        }
    }, [stops]);

    const cancelEditRoute = () => {
        setPreparedStops(getPrepareStops(stops));
        setTableMode(TableMode.NONE);
    };

    return (
        <Stack
            pt="16px"
            height="100%"
            overflow="hidden"
            gap={2}
        >
            <ManifestDetailsStyled.TableHeader
                paddingX="16px"

                // justifyContent="space-between"
            >
                {/* <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                >
                    <ManifestDetailsIcons.Stops color="primary" />
                    <Typography
                        fontSize="18px"
                        fontWeight={600}
                    >
                        {t('manifests.details.tabs.stops.header.title')}
                    </Typography>
                </Stack> */}
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={2}
                    flex="1 1 100%"
                >
                    {tableMode === TableMode.NONE && (
                        <DefaultActions
                            onCloseDialog={onCloseDialog}
                            manifestId={manifestId}
                            setTableMode={setTableMode}
                            countStops={preparedStops.length}
                            lastStopAppointmentStartAt={
                                preparedStops.at(-1)?.appointmentEndAtLocal ||
                                preparedStops.at(-1)?.appointmentStartAtLocal
                            }
                        />
                    )}
                    {tableMode === TableMode.TAKE_ROUTE && (
                        <TakeOutActions
                            selectedStops={selectedStops}
                            manifestId={manifestId}
                            setTableMode={setTableMode}
                            setSelectedStops={setSelectedStops}
                            preparedStops={preparedStops}
                        />
                    )}
                    {tableMode === TableMode.EDIT_ROUTE && (
                        <EditRouteActions
                            cancelEditRoute={cancelEditRoute}
                            isEqualStopsSequence={isEqualStopsSequence}
                            preparedStops={preparedStops}
                            manifestId={manifestId}
                            setTableMode={setTableMode}
                        />
                    )}
                </Stack>
            </ManifestDetailsStyled.TableHeader>

            <Collapse
                in={tableMode === TableMode.EDIT_ROUTE && !isEqualStopsSequence}
                sx={{ flexShrink: 0, paddingX: '16px' }}
            >
                <WarningAlert text="common:warnings.change_route" />
            </Collapse>

            <ManifestsStops
                manifestId={manifestId}
                selectedStops={selectedStops}
                setSelectedStops={setSelectedStops}
                setPreparedStops={setPreparedStops}
                stops={preparedStops}
                tableMode={tableMode}
                truckId={truckId}
                driverId={driverId}
            />
        </Stack>
    );
}
