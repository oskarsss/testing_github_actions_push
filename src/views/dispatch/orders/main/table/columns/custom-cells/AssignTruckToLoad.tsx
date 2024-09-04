import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import React from 'react';
import { Button } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAssignTruckToManifestMenu } from '@/@core/components/assign/modals/AssignTruckToManifest';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';

type Props = {
    friendlyId: string;
    manifestId: string;
    stops: ManifestModel_Stop[];
    isSelectedRow: boolean;
    loadId: string;
};

export default function AssignTruckToLoad({
    friendlyId,
    manifestId,
    stops,
    isSelectedRow,
    loadId
}: Props) {
    const assignTruckToManifest = useAssignTruckToManifestMenu();
    const { t } = useAppTranslation();

    const assignTruck = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        assignTruckToManifest.open({
            manifestFriendlyId      : friendlyId,
            manifestId,
            stops,
            alertAssignTruckFromLoad: true,
            loadId
        })(event);
    };

    return (
        <HotKeyTooltip
            title="common:manifests.assign_truck"
            hot_keys={isSelectedRow ? 'A' : undefined}
            sx={{
                zIndex: 500
            }}
        >
            <Button
                onClick={assignTruck}
                startIcon={<PersonAddAlt1OutlinedIcon />}
                sx={{
                    display       : 'flex',
                    borderRadius  : 0,
                    height        : '100%',
                    width         : '100%',
                    padding       : '0 2px',
                    justifyContent: 'flex-start',
                    cursor        : 'pointer',

                    '.MuiButton-startIcon': {
                        mr: '4px',
                        ml: 0
                    },

                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                {t('common:button.assign')}
            </Button>
        </HotKeyTooltip>
    );
}
