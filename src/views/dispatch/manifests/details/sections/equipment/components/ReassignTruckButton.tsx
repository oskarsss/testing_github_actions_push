import { MouseEvent } from 'react';
import ManifestStyled from '@/views/dispatch/manifests/components/styled';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';
import { useReAssignTruckToManifestMenu } from '@/@core/components/assign/modals/ReAssignTruckToManifest';
import Typography from '@mui/material/Typography';

type Props = {
    truckId: string;
    manifestId: string;
    manifestFriendlyId?: number | string;
    kind: 'text' | 'common';
};

export default function ReassignTruckButton({
    manifestId,
    manifestFriendlyId,
    truckId,
    kind
}: Props) {
    const reAssignTruckToManifestMenu = useReAssignTruckToManifestMenu();
    const reassignTruck = (event: MouseEvent<HTMLButtonElement>) => {
        reAssignTruckToManifestMenu.open({
            manifestFriendlyId,
            manifestId,
            selectedTruckId: truckId
        })(event);
    };

    return (
        <HotKeyTooltip
            title="common:tooltips.change_truck"
            hot_keys="R"
        >
            <ManifestStyled.ActionButton
                className="primary"
                kind={kind}
                onClick={reassignTruck}
            >
                {kind === 'text' && (
                    <Typography
                        component="span"
                        variant="body1"
                        fontSize="12px"
                        fontWeight={500}
                    >
                        Change
                    </Typography>
                )}
                <SwapHorizIcon />
            </ManifestStyled.ActionButton>
        </HotKeyTooltip>
    );
}
