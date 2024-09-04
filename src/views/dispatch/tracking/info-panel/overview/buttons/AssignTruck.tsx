import { Button, Stack } from '@mui/material';
import React, { MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAssignTruckToManifestMenu } from '@/@core/components/assign/modals/AssignTruckToManifest';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';
import { ManifestModel_Stop } from '@proto/models/model_manifest';

type Props = {
    friendlyId?: string | number;
    manifestId: string;
    stops: ManifestModel_Stop[];
    loadId: string;
};

export default function AssignTruck({
    friendlyId,
    manifestId,
    stops,
    loadId
}: Props) {
    const { t } = useAppTranslation();
    const assignTruckToManifest = useAssignTruckToManifestMenu();

    const assignTruckHandler = (event: MouseEvent<HTMLButtonElement>) => {
        assignTruckToManifest.open({
            alertAssignTruckFromLoad: true,
            manifestFriendlyId      : friendlyId,
            manifestId,
            stops,
            loadId
        })(event);
    };

    return (
        <Stack padding={2}>
            <HotKeyTooltip
                title="common:manifests.assign_truck"
                hot_keys="A"
            >
                <Button
                    variant="outlined"
                    onClick={assignTruckHandler}
                    fullWidth
                >
                    {t('common:actions.assign_truck')}
                </Button>
            </HotKeyTooltip>
        </Stack>
    );
}
