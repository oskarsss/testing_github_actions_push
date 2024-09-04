import { Stack, styled, Tooltip } from '@mui/material';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import LoadStatusChipSelect from '@/@core/fields/chip-select/LoadStatusChipSelect';
import { ENTITY_CHIP_COLORS } from '@/@core/theme/entities';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import { toggleShowPanel } from '@/store/dispatch/tracking/actions';
import { TrackingActions } from '@/store/dispatch/tracking/slice';
import { LoadStatus } from '@/models/loads/load';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import { MANIFEST_STATUS_GRPC_COLORS } from '@/@core/theme/entities/manifests/status';
import { IChipColors } from '@/@core/theme/chip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import openNewTab from '@/utils/openNewTab';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

const OrderId = styled('p')<{ color: IChipColors }>(({
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
    loadId: string;
    loadFriendlyId: string | number;
    loadStatus: LoadStatus;
};

function LinePanelHeader({
    loadId,
    loadFriendlyId,
    loadStatus
}: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const editLoadDialog = useEditLoadDialog();
    const toggleShowPanelHandler = () => {
        dispatch(toggleShowPanel());
    };

    const onClickEditLoad = () => {
        editLoadDialog.open({
            load_id           : loadId,
            onSuccessfulDelete: () => dispatch(TrackingActions.ResetSelectedLoad())
        });
    };

    const loadStatusColor = ENTITY_CHIP_COLORS[loadStatus];

    const openOrderNewTab = () => {
        openNewTab(APP_ROUTES_CONFIG.dispatch.orders.details(loadId));
    };

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

            <LoadStatusChipSelect
                load_status={loadStatus}
                load_id={loadId}
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
                    <OrderId
                        onClick={openOrderNewTab}
                        color={loadStatusColor}
                    >
                        {t('common:loads.friendlyId', { friendlyId: loadFriendlyId })}
                    </OrderId>
                </Stack>
            </Tooltip>

            <IconButtonWithTooltip
                size="small"
                tooltip="common:button.open_edit_order"
                onClick={onClickEditLoad}
                icon={(
                    <EditIcon
                        fontSize="small"
                        sx={{
                            color: (theme) =>
                                theme.palette.utility.foreground[loadStatusColor].primary
                        }}
                    />
                )}
            />
        </Stack>
    );
}

export default LinePanelHeader;
