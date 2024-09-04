import React, { CSSProperties } from 'react';
import { LoadInvoiceStatus, LoadInvoiceStatuses } from '@/models/loads/load';
import LoadsTypes from '@/store/dispatch/loads/types';
import { usePermissions } from '@/store/app/hooks';
import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import { useAppDispatch } from '@/store/hooks';
import { api } from '@/store/api';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import { LOAD_INVOICE_STATUS_ICONS } from '@/@core/theme/entities/load/invoice_status';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';

import { LOAD_INVOICE_STATUS_TO_GRPC_ENUM } from '@/models/loads/load-mappings';
import { PERMISSIONS } from '@/models/permissions/permissions';

type Props = {
    load_id: LoadsTypes.Load.Load['loadId'];
    invoice_status: LoadInvoiceStatus;
    styles?: CSSProperties;
    tooltip?: string;
    is_changing?: boolean;
    invalidateTags?: ChipSelectTypes.InvalidateTags;
    invalidateFns?: () => void;
} & ChipSelectTypes.OtherProps;

export default function LoadInvoiceStatusChipSelect({
    load_id,
    invoice_status,
    is_changing = true,
    invalidateTags = [],
    invalidateFns,
    ...other_props
}: Props) {
    const { hasPermission } = usePermissions();
    const dispatch = useAppDispatch();
    const canEditInvoiceStatus = hasPermission(PERMISSIONS.EDIT_LOAD_INVOICE_STATUS);

    const [updateStatus] = LoadsGrpcService.useUpdateInvoiceStatusMutation();

    const onChange: ChipSelectTypes.OnChange<LoadInvoiceStatus> = (status) =>
        updateStatus({
            loadId          : load_id,
            newInvoiceStatus: LOAD_INVOICE_STATUS_TO_GRPC_ENUM[status]
        })
            .unwrap()
            .then(() => {
                if (invalidateTags?.length > 0) {
                    dispatch(api.util.invalidateTags(invalidateTags));
                }
                if (invalidateFns) {
                    invalidateFns();
                }
            });

    return (
        <ChipSelect<LoadInvoiceStatus>
            status={invoice_status}
            options={Object.values(LoadInvoiceStatuses)}
            custom_icons={LOAD_INVOICE_STATUS_ICONS}
            status_prefix="state_info:loads.invoice_status"
            is_changing={canEditInvoiceStatus && is_changing}
            onChange={onChange}
            ignoreWaitingResponse
            {...other_props}
        />
    );
}
