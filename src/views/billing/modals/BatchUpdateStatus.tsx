import { LOAD_INVOICE_STATUS_ICONS } from '@/@core/theme/entities/load/invoice_status';
import MenuComponents from '@/@core/ui-kits/menus';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import {
    LoadInvoiceStatus,
    LoadInvoiceStatuses,
    LoadStatus,
    LoadStatuses
} from '@/models/loads/load';
import {
    LOAD_INVOICE_STATUS_TO_GRPC_ENUM,
    LOAD_STATUS_GRPC_ENUM,
    LOAD_STATUS_TO_GRPC_ENUM
} from '@/models/loads/load-mappings';
import { useSelectedTableIds } from '@/store/table/hooks';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { MenuItem, MenuList, Stack } from '@mui/material';
import React, { useMemo } from 'react';

export const useBatchUpdateInvoiceStatusMenu = menuHookFabric(BatchUpdateInvoiceStatus);

type Props = {
    tableName: string;
};
export default function BatchUpdateInvoiceStatus({ tableName }: Props) {
    const [trigger] = LoadsGrpcService.useBatchUpdateInvoiceStatusMutation();
    const totalSelectedLoads = useSelectedTableIds(tableName);
    const { t } = useAppTranslation();
    const menu = useBatchUpdateInvoiceStatusMenu(true);

    const onClick = (value: LoadInvoiceStatus) => {
        trigger({
            loadIds         : totalSelectedLoads,
            newInvoiceStatus: LOAD_INVOICE_STATUS_TO_GRPC_ENUM[value]
        });
        menu.close();
    };
    return (
        <MenuList
            disablePadding
            sx={{
                minWidth: 240
            }}
        >
            {Object.values(LoadInvoiceStatuses).map((status) => (
                <MenuItem
                    onClick={() => onClick(status)}
                    sx={{
                        padding: '6px 10px'
                    }}
                    key={status}
                    value={status}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >
                        <span
                            style={{
                                display       : 'flex',
                                alignItems    : 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {LOAD_INVOICE_STATUS_ICONS[status]}
                        </span>
                        <span
                            style={{
                                display       : 'flex',
                                alignItems    : 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {t(`state_info:loads.invoice_status.${status}`)}
                        </span>
                    </Stack>
                </MenuItem>
            ))}
        </MenuList>
    );
}
