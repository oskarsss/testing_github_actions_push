import { PAGE_ROW_HEIGHT_CONFIG } from '@/@core/components/table/TableEditor/components/TableView/components/PageRowHight/PageRowHeight';
import TableTypes from '@/@core/components/table/types';

import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';

import SettlementsTypes from '@/store/accounting/settlements/types';
import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import React, { memo } from 'react';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

type Props = {
    row: TableTypes.Row<SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow>;
    rowHeight: number;
};

function Driver({
    row,
    rowHeight
}: Props) {
    const { url } = usePrivateFileUrl(row.driver?.selfieThumbUrl);

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={2}
        >
            <Avatar
                src={url}
                sx={{
                    width : rowHeight === PAGE_ROW_HEIGHT_CONFIG.small ? '20px' : '40px',
                    height: rowHeight === PAGE_ROW_HEIGHT_CONFIG.small ? '20px' : '40px'
                }}
            />
            <Stack
                direction={
                    rowHeight === PAGE_ROW_HEIGHT_CONFIG.small ||
                    rowHeight === PAGE_ROW_HEIGHT_CONFIG.medium
                        ? 'row'
                        : 'column'
                }
                alignItems={
                    rowHeight === PAGE_ROW_HEIGHT_CONFIG.small ||
                    rowHeight === PAGE_ROW_HEIGHT_CONFIG.medium
                        ? 'center'
                        : 'flex-start'
                }
            >
                <Typography
                    fontSize="14px"
                    variant="body1"
                    fontWeight={500}
                >
                    {row.driver?.firstName || ''} {row.driver?.lastName || ''}
                </Typography>
                <Stack
                    spacing={2}
                    direction="row"
                    alignItems="center"
                >
                    <Stack
                        spacing={4}
                        direction="row"
                        alignItems="center"
                        paddingRight={rowHeight === PAGE_ROW_HEIGHT_CONFIG.large ? 2 : 0}
                        paddingLeft={
                            rowHeight === PAGE_ROW_HEIGHT_CONFIG.small ||
                            rowHeight === PAGE_ROW_HEIGHT_CONFIG.medium
                                ? 2
                                : 0
                        }
                    >
                        {rowHeight === PAGE_ROW_HEIGHT_CONFIG.small && row.driverType && (
                            <Tooltip
                                title={row?.driverType?.name}
                                placement="top"
                            >
                                <span style={{ height: '24px' }}>
                                    {DRIVER_TYPE_ICONS[row.driverType.icon]}
                                </span>
                            </Tooltip>
                        )}
                        {rowHeight !== PAGE_ROW_HEIGHT_CONFIG.small &&
                            row.driverType &&
                            DRIVER_TYPE_ICONS[row.driverType?.icon]}
                        {/* {DRIVER_TYPE_ICONS[row.driver_type_icon]} */}
                        {rowHeight === PAGE_ROW_HEIGHT_CONFIG.large && row.driverType && (
                            <span style={{ marginLeft: 0 }}>{row?.driverType?.name}</span>
                        )}
                    </Stack>
                    {/* {row.insurance_endorsed
                        ? INSURANCE_ICONS.insurance
                        : INSURANCE_ICONS.notInsurance}{' '}
                    Ins. */}
                </Stack>
            </Stack>
        </Stack>
    );
}

export default memo(Driver);
