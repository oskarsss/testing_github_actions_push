import React from 'react';
import ManifestStopsGrpcService from '@/@grpcServices/services/manifests-service/manifest-stops.service';
import SaveIcon from '@mui/icons-material/Save';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { ManifestModel_StopID } from '@proto/models/model_manifest';
import { Stack } from '@mui/material';
import ActionsStyled from '@/@core/ui-kits/loads/load-stop/actions/ActionStyled';

type Props = {
    setTableMode: (mode: TableMode) => void;
    manifestId: string;
    preparedStops: ManifestsTypes.AnyPreparedStop[];
    isEqualStopsSequence: boolean;
    cancelEditRoute: () => void;
};

export default function EditRouteActions({
    setTableMode,
    manifestId,
    preparedStops,
    isEqualStopsSequence,
    cancelEditRoute
}: Props) {
    const [trigger] = ManifestStopsGrpcService.useUpdateStopSequenceMutation();
    const { t } = useAppTranslation();

    const updateRoute = async () => {
        const newStopSequences = preparedStops.map(
            (stop): ManifestModel_StopID => ({
                loadId        : stop.loadId,
                loadStopId    : stop.loadStopId,
                manifestStopId: stop.manifestStopId
            })
        );
        await trigger({
            manifestId,
            newStopSequences
        });
        setTableMode(TableMode.NONE);
    };

    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            gap="inherit"
        >
            <ActionsStyled.Button
                startIcon={<SaveIcon />}
                variant="text"
                onClick={updateRoute}
                disabled={isEqualStopsSequence}
            >
                {t('modals:manifests.details.tabs.stops.header.buttons.update_route')}
            </ActionsStyled.Button>
            <ActionsStyled.Cancel onClick={cancelEditRoute} />
        </Stack>
    );
}
