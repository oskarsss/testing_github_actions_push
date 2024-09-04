import {
    MANIFEST_STATUS_GRPC_COLORS,
    MANIFEST_STATUS_GRPC_ICONS
} from '@/@core/theme/entities/manifests/status';
import { Stack, styled, Tooltip } from '@mui/material';
import React from 'react';
import { ManifestModel_Status } from '@proto/models/model_manifest';
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
    manifestStatus: ManifestModel_Status;
    manifestId: string;
    manifestFriendlyId: string | number;
};

function ManifestHeader({
    manifestStatus,
    manifestId,
    manifestFriendlyId
}: Props) {
    const { t } = useAppTranslation();
    const openOrderNewTab = (mId: string) =>
        openNewTab(APP_ROUTES_CONFIG.dispatch.manifests.details(mId));

    return (
        <Stack
            alignItems="center"
            overflow="hidden"
            sx={{
                svg: {
                    fontSize: '16px',
                    width   : '24px',
                    height  : '24px',
                    color   : (theme) =>
                        theme.palette.utility.foreground[
                            MANIFEST_STATUS_GRPC_COLORS[manifestStatus]
                        ]?.primary
                }
            }}
        >
            <Tooltip
                title={t(`state_info:manifests.status.${manifestStatus}`)}
                disableInteractive
            >
                {MANIFEST_STATUS_GRPC_ICONS[manifestStatus]}
            </Tooltip>

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
                        onClick={() => openOrderNewTab(manifestId)}
                        color={MANIFEST_STATUS_GRPC_COLORS[manifestStatus]}
                    >
                        {t('common:manifests.friendlyId', {
                            friendlyId: manifestFriendlyId
                        })}
                    </ManifestId>
                </Stack>
            </Tooltip>
        </Stack>
    );
}

export default ManifestHeader;
