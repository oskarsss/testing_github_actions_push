import TableTypes from '@/@core/components/table/types';
import { PayoutModel } from '@proto/models/model_payout';
import PayoutStatusChipSelect from '@/@core/fields/chip-select/PayoutStatusChipSelect';
import PayoutPaymentTypeChipSelect from '@/@core/fields/chip-select/PayoutPaymentTypeChipSelect';
import { StatusChipCellStyle } from '@/@core/components/table/styles/statusChipCellStyle';
import { useVendorsMap } from '@/store/hash_maps/hooks';
import DriverTooltipForTable from '@/@core/components/table-tooltips/DriverTooltipForTable';
import { Stack, Typography } from '@mui/material';
import { VendorIcon } from '@/@core/icons/custom-nav-icons/icons';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

function EntityTypeCell({ row }: { row: TableTypes.Row<PayoutModel> }) {
    const driversMap = useDriversMap();
    const vendorsMap = useVendorsMap();
    const driver = driversMap[row.entityId];
    const vendor = vendorsMap[row.entityId];

    if (row.entityType === 'driver' && driver) {
        return (
            <DriverTooltipForTable
                driver_id={driver.driverId}
                full_name={`${driver.firstName || ''} ${driver.lastName || ''}`}
            />
        );
    }
    if (row.entityType === 'vendor' && vendor) {
        return (
            <Stack
                direction="row"
                alignItems="center"
                paddingLeft="14px"
                gap={1.5}
                sx={{
                    svg: {
                        fill: ({ palette }) => palette.semantic.foreground.primary
                    }
                }}
            >
                <VendorIcon />
                <Typography fontSize="14px">{vendor.name}</Typography>
            </Stack>
        );
    }
    return null;
}

const columns: TableTypes.FixedCustomColumns<TableTypes.Row<PayoutModel>> = {
    // multi_select_checkbox: {
    //     width: 50,
    //     style: {
    //         display       : 'flex',
    //         justifyContent: 'center',
    //         alignItems    : 'center'
    //     },
    //     renderCell: (row) => (
    //         <SelectDeselectItemsCheckbox
    //             id={row.payoutId}
    //             tableName="payouts"
    //         />
    //     )
    // },
    entityType: {
        width: 150,
        renderCell(row) {
            return <EntityTypeCell row={row} />;
        }
    },
    amountFormatted: {
        width: 150,
        renderCell(row) {
            return <div>{row.amountFormatted}</div>;
        }
    },
    referenceId: {
        width: 150,
        renderCell(row) {
            return <div>{row.referenceId}</div>;
        }
    },
    status: {
        width: 190,
        style: StatusChipCellStyle,
        renderCell(row) {
            return (
                <PayoutStatusChipSelect
                    payoutId={row.payoutId}
                    payoutStatus={row.status}
                    full_width
                />
            );
        }
    },
    type: {
        width: 190,
        style: StatusChipCellStyle,
        renderCell(row) {
            return (

                // <Box
                //     display='flex'
                //     justifyContent='center'
                //     alignItems='center'
                // >
                <PayoutPaymentTypeChipSelect
                    amount={row.amount}
                    bankAccountId={row.bankAccountId}
                    referenceId={row.referenceId}
                    status={row.status}
                    payoutId={row.payoutId}
                    type={row.type}
                    full_width
                />

            // </Box>
            );
        }
    }
};

export default columns;
