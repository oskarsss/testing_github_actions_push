import { Button } from '@mui/material';
import React from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAssignTruckToManifestMenu } from '@/@core/components/assign/modals/AssignTruckToManifest';
import { ManifestModel_Stop } from '@proto/models/model_manifest';

type Props = {
    manifestId: string;
    manifestFriendlyId: number | string;
    stops: ManifestModel_Stop[];
    loadId: string;
};

export default function LoadManifestAssignTruck({
    manifestId,
    manifestFriendlyId,
    stops,
    loadId
}: Props) {
    const assignTruckToManifest = useAssignTruckToManifestMenu();
    const { t } = useAppTranslation();

    const assignHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        assignTruckToManifest.open({
            manifestFriendlyId,
            manifestId,
            stops,
            loadId
        })(event);
    };

    return (
        <Button
            onClick={assignHandler}
            sx={{
                padding   : '0px 10px',
                height    : '24px',
                fontSize  : '12px',
                fontWeight: 600,
                lineHeight: 1.5,

                '.MuiButton-icon': {
                    marginRight: '4px',

                    svg: {
                        width : '16px',
                        height: '16px'
                    }
                }
            }}
            color="primary"
            startIcon={<ControlPointIcon />}
        >
            {t('common:actions.assign_truck')}
        </Button>
    );
}
