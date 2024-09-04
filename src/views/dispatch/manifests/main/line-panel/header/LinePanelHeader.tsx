import { Stack, styled, Tooltip } from '@mui/material';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { toggleShowPanel } from '@/store/dispatch/manifests/actions/views';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import { useEditManifestDialog } from '@/views/dispatch/manifests/modals/edit-manifest/EditManifest';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import { MANIFEST_STATUS_GRPC_COLORS } from '@/@core/theme/entities/manifests/status';
import ManifestStatusChipSelect from '@/@core/fields/chip-select/ManifestStatusChipSelect';
import { IChipColors } from '@/@core/theme/chip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import openNewTab from '@/utils/openNewTab';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

const ManifestId = styled('p')<{ color: IChipColors }>(({
    theme,
    color
}) => ({
    margin      : 0,
    color       : theme.palette.utility.text[color],
    fontSize    : '12px',
    fontWeight  : 600,
    lineHeight  : 1.4,
    textAlign   : 'center',
    maxWidth    : '45px',
    whiteSpace  : 'nowrap',
    textOverflow: 'ellipsis'
}));

type Props = {
    manifestId: string;
    manifestFriendlyId: string | number;
    manifestStatus: ManifestModel_Status;
};

function LinePanelHeader({
    manifestId,
    manifestFriendlyId,
    manifestStatus
}: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const editManifestDialog = useEditManifestDialog();
    const toggleShowPanelHandler = () => {
        dispatch(toggleShowPanel());
    };

    const onClickEditLoad = () => {
        editManifestDialog.open({
            manifestId
        });
    };

    const openManifestNewTab = () => {
        openNewTab(APP_ROUTES_CONFIG.dispatch.manifests.details(manifestId));
    };

    const statusColor = MANIFEST_STATUS_GRPC_COLORS[manifestStatus];

    return (
        <Stack
            alignItems="center"
            gap="4px"
        >
            <IconButtonWithTooltip
                tooltip="common:show_panel"
                onClick={toggleShowPanelHandler}
                icon={<KeyboardTabIcon fontSize="small" />}
                size="small"
            />

            <ManifestStatusChipSelect
                manifestId={manifestId}
                status={manifestStatus}
                sx={{
                    maxWidth: '40px',
                    minWidth: '40px'
                }}
                show_arrow={false}
                stylesText={{
                    display: 'none'
                }}
            />

            <Tooltip
                title={t('common:tooltips.open_in_new_tab')}
                disableInteractive
            >
                <Stack
                    whiteSpace="nowrap"
                    flexDirection="row"
                    alignItems="center"
                    gap="inherit"
                    overflow="hidden"
                    mr="4px"
                    sx={{
                        cursor    : 'pointer',
                        opacity   : 1,
                        transition: 'opacity 0.3s',
                        '&:hover' : {
                            opacity: 0.7
                        }
                    }}
                >
                    <ManifestId
                        onClick={openManifestNewTab}
                        color={MANIFEST_STATUS_GRPC_COLORS[manifestStatus]}
                    >
                        {t('common:manifests.friendlyId', {
                            friendlyId: manifestFriendlyId
                        })}
                    </ManifestId>
                </Stack>
            </Tooltip>

            <IconButtonWithTooltip
                size="small"
                tooltip="common:button.open_edit_manifest"
                onClick={onClickEditLoad}
                icon={(
                    <EditIcon
                        fontSize="small"
                        sx={{
                            color: ({ palette }) => palette.utility.foreground[statusColor]?.primary
                        }}
                    />
                )}
            />
        </Stack>
    );
}

export default LinePanelHeader;
