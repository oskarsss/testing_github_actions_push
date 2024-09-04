import { ENTITY_CHIP_COLORS } from '@/@core/theme/entities';
import { IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import { useAppDispatch } from '@/store/hooks';
import { TrackingActions } from '@/store/dispatch/tracking/slice';
import { LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import LoadStatusChipSelect from '@/@core/fields/chip-select/LoadStatusChipSelect';
import type { LoadModel_InvoiceStatus, LoadModel_Status } from '@proto/models/model_load';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toggleShowPanel } from '@/store/dispatch/tracking/actions';

type Props = {
    loadId: string;
    loadStatus: LoadModel_Status;
    invoiceStatus: LoadModel_InvoiceStatus;
};

function TrackingLoadStatus({
    loadId,
    loadStatus,
    invoiceStatus
}: Props) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const toggleShowPanelHandler = () => {
        dispatch(toggleShowPanel());
    };
    const editLoadDialog = useEditLoadDialog();
    const convertedStatus = LOAD_STATUS_GRPC_ENUM[loadStatus];

    // const convertedInvoiceStatus = LOAD_INVOICE_STATUS_GRPC_ENUM[invoiceStatus];

    const onClickEditLoad = () => {
        editLoadDialog.open({
            load_id           : loadId,
            onSuccessfulDelete: () => dispatch(TrackingActions.ResetSelectedLoad())
        });
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            padding="0 16px"
            height="32px"
            justifyContent="space-between"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.utility.foreground[ENTITY_CHIP_COLORS[convertedStatus]].secondary,
                borderBottom: (theme) =>
                    `1px solid ${
                        theme.palette.utility.foreground[ENTITY_CHIP_COLORS[convertedStatus]]
                            .primary
                    }`
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
            >
                <LoadStatusChipSelect
                    load_status={convertedStatus}
                    load_id={loadId}
                    sx={{
                        '&:not(:hover)': {
                            backgroundColor: 'transparent'
                        }
                    }}
                />
            </Stack>
            <Stack
                direction="row"
                spacing={1}
            >
                <Tooltip
                    title={t('common:tooltips.hide_panel')}
                    placement="top"
                    disableInteractive
                >
                    <IconButton
                        size="small"
                        onClick={toggleShowPanelHandler}
                    >
                        <KeyboardTabIcon
                            sx={{
                                transform: 'rotate(180deg)',
                                color    : (theme) =>
                                    theme.palette.utility.foreground[
                                        ENTITY_CHIP_COLORS[convertedStatus]
                                    ].primary
                            }}
                            fontSize="small"
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title={t('common:button.open_edit_order')}
                    placement="top"
                    disableInteractive
                >
                    <IconButton
                        color="primary"
                        onClick={onClickEditLoad}
                        size="small"
                        sx={{
                            color: (theme) =>
                                theme.palette.utility.foreground[
                                    ENTITY_CHIP_COLORS[convertedStatus]
                                ].primary
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    );
}

export default React.memo(TrackingLoadStatus);
