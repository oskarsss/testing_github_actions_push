import { Button } from '@mui/material';
import React, { memo } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAssignTruckToManifestMenu } from '@/@core/components/assign/modals/AssignTruckToManifest';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';
import { ManifestModel_Stop } from '@proto/models/model_manifest';

type Props = {
    manifestId: string;
    manifestFriendlyId: string;
    stops: ManifestModel_Stop[];
};

function AssignTruckControl({
    manifestId,
    manifestFriendlyId,
    stops
}: Props) {
    const assignTruckToManifest = useAssignTruckToManifestMenu();
    const { t } = useAppTranslation();

    const assignHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        assignTruckToManifest.open({ manifestId, manifestFriendlyId, stops })(event);
    };

    return (
        <HotKeyTooltip
            title="common:manifests.assign_truck"
            hot_keys="A"
        >
            <Button
                onClick={assignHandler}
                sx={{
                    height: '100%'
                }}
                variant="outlined"
                color="primary"
                startIcon={<ControlPointIcon />}
            >
                {t('common:actions.assign_truck')}
            </Button>
        </HotKeyTooltip>
    );
}

export default memo(AssignTruckControl);
