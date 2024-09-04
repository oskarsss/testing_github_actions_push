import { Stack, Typography, Button } from '@mui/material';
import React, { memo } from 'react';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAssignTruckToManifestMenu } from '@/@core/components/assign/modals/AssignTruckToManifest';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import { OrdersTableTextCell } from '@/@core/ui-kits/loads/table';

type Props = {
    driverId: string;
    truckId: string;
    manifestId: string;
    manifestFriendlyId: string;
    stops: ManifestModel_Stop[];
    isSelectedRow: boolean;
};

function Truck({
    driverId,
    truckId,
    manifestFriendlyId,
    manifestId,
    stops,
    isSelectedRow
}: Props) {
    const driversMap = useDriversMap();
    const trucksMap = useTrucksMap();
    const assignTruckToManifest = useAssignTruckToManifestMenu();
    const { t } = useAppTranslation();

    const assignHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        assignTruckToManifest.open({
            manifestFriendlyId,
            manifestId,
            stops
        })(event);
    };

    const driver = driversMap[driverId];
    const truck = trucksMap[truckId];

    if (!truckId) {
        return (
            <HotKeyTooltip
                title="common:manifests.assign_truck"
                hot_keys={isSelectedRow ? 'A' : undefined}
                sx={{
                    zIndex: 500
                }}
            >
                <Button
                    variant="text"
                    color="primary"
                    size="small"
                    sx={{
                        maxHeight: '24px',
                        display  : 'flex',
                        padding  : '0 2px !important'
                    }}
                    startIcon={<PersonAddAlt1OutlinedIcon fontSize="small" />}
                    onClick={assignHandler}
                >
                    {t('common:button.assign')}
                </Button>
            </HotKeyTooltip>
        );
    }

    return (
        <OrdersTableTextCell
            title={truck?.referenceId}
            description={`${driver?.firstName || '-'} ${driver?.lastName[0] || ''}`}
        />
    );
}

export default memo(Truck);
