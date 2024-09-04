/* eslint-disable max-len */

import Tooltip from '@mui/material/Tooltip';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import VectorIcons from '@/@core/icons/vector_icons';
import React from 'react';
import openNewWindow from '@/utils/open-new-window';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    loadId: string;
    loadFriendlyId: string;
    otherStop: boolean;
    isManifestPage: boolean;
};

export default function OrderFriendlyId({
    loadFriendlyId,
    loadId,
    otherStop,
    isManifestPage
}: Props) {
    const { t } = useAppTranslation();

    const onOpenLoad = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        openNewWindow(APP_ROUTES_CONFIG.dispatch.orders.details(loadId));
    };

    const text = t('common:loads.friendlyId', { friendlyId: loadFriendlyId });

    if (!loadId || !loadFriendlyId) return null;
    if (isManifestPage) {
        return (
            <Tooltip
                disableInteractive
                title={t('common:tooltips.open_in_new_tab')}
            >
                <span style={{ marginLeft: 'auto' }}>
                    <Badge
                        onClick={onOpenLoad}
                        variant="outlined"
                        text={text}
                        icon={(
                            <VectorIcons.CubeIcon
                                sx={{
                                    color: (theme) =>
                                        `${theme.palette.semantic.foreground.brand.primary} !important`
                                }}
                            />
                        )}
                        utilityColor={isManifestPage ? undefined : 'warning'}
                        sx={{
                            cursor    : 'pointer',
                            transition: 'opacity 0.2s',

                            '&:hover': {
                                opacity: 0.8
                            }
                        }}
                    >
                        <VectorIcons.ArrowRightIcon />
                    </Badge>
                </span>
            </Tooltip>
        );
    }

    if (otherStop) {
        return (
            <Tooltip
                disableInteractive
                title={t('common:tooltips.open_in_new_tab')}
            >
                <span style={{ marginLeft: 'auto' }}>
                    <Badge
                        onClick={onOpenLoad}
                        variant="outlined"
                        text={text}
                        icon={<VectorIcons.CubeIcon />}
                        utilityColor="warning"
                        sx={{
                            cursor     : 'pointer',
                            transition : 'opacity 0.2s',
                            borderColor: (theme) =>
                                theme.palette.utility.foreground.warning.secondary,
                            backgroundColor: (theme) =>
                                theme.palette.utility.foreground.warning.tertiary,
                            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',

                            '&:hover': {
                                opacity: 0.8
                            }
                        }}
                    >
                        <VectorIcons.ArrowRightIcon />
                    </Badge>
                </span>
            </Tooltip>
        );
    }
    return null;
}
