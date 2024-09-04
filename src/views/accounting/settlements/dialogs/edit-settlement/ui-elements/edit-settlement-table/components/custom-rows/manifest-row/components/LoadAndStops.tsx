import { memo } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { LOAD_INVOICE_STATUS_GRPC_ENUM, LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import LoadInvoiceStatusChipSelect from '@/@core/fields/chip-select/LoadInvoiceStatusChipSelect';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import LoadStatusChipSelect from '@/@core/fields/chip-select/LoadStatusChipSelect';
import type { Load } from '../manifest-details-table/ManifestDetailsTable';
import manifestDetailsColumns from '../manifest-details-table/ManifestDetailsColumns';

type Props = {
    load: Load;
    settlementId: string;
};

function LoadAndStops({
    load,
    settlementId
}: Props) {
    const { t } = useAppTranslation();
    const editLoadDialog = useEditLoadDialog();

    const { refetch } = useEditSettlementContext();

    const openEditLoadDialog = () => {
        editLoadDialog.open({ load_id: load?.loadId || '' });
    };

    return (
        <MiniTableStyled.Cell
            flex_start
            min_width={manifestDetailsColumns.loadAndStops}
            hasMaxWidth
        >
            {load && (
                <Stack
                    direction="row"
                    overflow="hidden"
                    alignItems="center"
                >
                    <Stack
                        direction="row"
                        gap="5px"
                        flex={2}
                        overflow="hidden"
                        alignItems="center"
                    >
                        <Button
                            variant="text"
                            onClick={openEditLoadDialog}
                            sx={{
                                padding : 0,
                                fontSize: '12px',
                                color   : (theme) =>
                                    `${theme.palette.semantic.text.brand.primary} !important`,
                                minWidth      : '10px !important',
                                textDecoration: 'underline',
                                whiteSpace    : 'nowrap',
                                '&:hover'     : {
                                    background: 'none'
                                }
                            }}
                        >
                            {t('common:loads.friendlyId', { friendlyId: load.friendlyId })}
                        </Button>

                        <Typography
                            width="4px"
                            height="4px"
                            borderRadius="50%"
                            bgcolor="text.secondary"
                        />

                        <Typography
                            noWrap
                            variant="body1"
                            fontWeight={500}
                            fontSize="12px"
                            color="text.secondary"
                        >
                            #{load.refId}
                        </Typography>

                        <Typography
                            width="4px"
                            height="4px"
                            borderRadius="50%"
                            bgcolor="text.secondary"
                        />
                        <Typography
                            noWrap
                            variant="body1"
                            fontWeight={500}
                            fontSize="12px"
                            color="text.secondary"
                        >
                            {load.stopsCount} stops
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        <LoadInvoiceStatusChipSelect
                            show_arrow={false}
                            invalidateFns={refetch}
                            load_id={load.loadId}
                            stylesText={{ fontSize: '10px' }}
                            size="small"
                            invoice_status={LOAD_INVOICE_STATUS_GRPC_ENUM[load.invoiceStatus]}
                        />
                        <LoadStatusChipSelect
                            show_arrow={false}
                            stylesText={{ fontSize: '10px' }}
                            size="small"
                            invalidateFns={refetch}
                            load_id={load.loadId}
                            load_status={LOAD_STATUS_GRPC_ENUM[load.status]}
                        />
                    </Stack>

                    <Typography
                        noWrap
                        flex={1}
                        variant="body1"
                        fontWeight={500}
                        fontSize="12px"
                        color="text.secondary"
                        textAlign="right"
                    >
                        {load.totalDistance}
                    </Typography>
                </Stack>
            )}
        </MiniTableStyled.Cell>
    );
}

export default memo(LoadAndStops);
