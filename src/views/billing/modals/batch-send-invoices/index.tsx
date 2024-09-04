import MiniTableHeader from '@/@core/ui-kits/basic/mini-table/components/MiniTableHeader';
import MiniTableNoItems from '@/@core/ui-kits/basic/mini-table/components/MiniTableNoItems';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import { useBrokersMap, useCustomersMap, useFactoringCompaniesMap } from '@/store/hash_maps/hooks';
import { useAppSelector } from '@/store/hooks';
import { useSelectedTableIds } from '@/store/table/hooks';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { SendSettlementIcon } from '@/views/accounting/settlements/dialogs/batch-send-settlements/BatchSendSettlements';
import { Button, Stack, TableBody } from '@mui/material';
import { OrderInvoiceBatchSendRequest_Order } from '@proto/loads';
import { LoadModel_InvoiceStatus, LoadModel_Status } from '@proto/models/model_load';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import BrandCheckbox from '@/@core/ui-kits/basic/brand-checkbox/BrandCheckbox';
import ControlledCheckboxInput from '@/@core/fields/checkbox/ControlledCheckbox';
import columns from './columns';
import Row from './Row';
import BodyTextField from './BodyTextField';
import SubjectTextField from './SubjectTextField';
import { MentionsConfig } from './MentionsPopper';

type Props = { tableName: string };

export type OrderFormValues = OrderInvoiceBatchSendRequest_Order & {
    friendlyId: string;
    status: LoadModel_Status;
    invoiceStatus: LoadModel_InvoiceStatus;
    customerId: string;
    brokerId: string;
    factoringCompanyId: string;
};

export type FormValues = {
    orders: OrderFormValues[];
    sendToCompanyCcEmails: boolean;
    subject: string;
    body: string;
};

export const useBatchSendInvoicesDialog = hookFabric(BatchSendInvoices, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="800px"
    />
));

export default function BatchSendInvoices({ tableName }: Props) {
    const [trigger] = LoadsGrpcService.useBatchSendInvoiceMutation();
    const { t } = useTranslation();
    const totalSelectedLoads = useSelectedTableIds(tableName);
    const indexes = useAppSelector(OrdersDataSelectors.getOrdersOrderIdToIndexMap);
    const rows = useAppSelector(OrdersDataSelectors.getOrdersRows);
    const customersMap = useCustomersMap();
    const brokersMap = useBrokersMap();
    const dialog = useBatchSendInvoicesDialog(true);

    const [selectedRow, setSelectedRow] = useState<string>('');

    const defaultRows = useMemo(
        () =>
            totalSelectedLoads.reduce<OrderFormValues[]>((acc, order) => {
                const idx = indexes[order];
                const row = rows[idx];
                if (row) {
                    const customer = customersMap[row.customerId];
                    const broker = brokersMap[row.brokerId];

                    const billingEmail = customer?.billingEmail || broker?.billingEmail;
                    acc.push({
                        email             : billingEmail || '',
                        friendlyId        : row.friendlyId,
                        status            : row.status,
                        invoiceStatus     : row.invoiceStatus,
                        body              : '',
                        subject           : '',
                        orderId           : row.loadId,
                        customerId        : row.customerId,
                        brokerId          : row.brokerId,
                        factoringCompanyId: row.invoiceFactoringCompanyId
                    });
                }
                return acc;
            }, []),
        [totalSelectedLoads, indexes, rows, customersMap, brokersMap]
    );

    const {
        handleSubmit,
        control
    } = useForm<FormValues>({
        values: {
            orders               : defaultRows,
            sendToCompanyCcEmails: false,
            subject              : '',
            body                 : ''
        }
    });

    const transformText = (text: string, row: OrderFormValues) => {
        const broker = brokersMap[row.brokerId];
        const customer = customersMap[row.customerId];
        const name = broker?.name || customer?.name;
        return text
            .replace(MentionsConfig.recipient, name || '')
            .replace(MentionsConfig.orderId, row.friendlyId.toString())
            .replace(MentionsConfig.email, row.email);
    };

    const submit = (data: FormValues) => {
        const preparedData = data.orders.map((order) => ({
            orderId              : order.orderId,
            email                : order.email,
            subject              : transformText(data.subject, order),
            body                 : transformText(data.body, order),
            factoringCompanyId   : order.factoringCompanyId,
            sendToCompanyCcEmails: data.sendToCompanyCcEmails
        }));

        trigger({
            orders               : preparedData,
            sendToCompanyCcEmails: data.sendToCompanyCcEmails
        });
        dialog.close();
    };

    return (
        <DialogComponents.Form
            style={{ height: '100%' }}
            onSubmit={handleSubmit(submit)}
        >
            <DialogComponents.Header
                Icon={<SendSettlementIcon fontSize="large" />}
                title="Send Invoices"
            />
            <Stack
                direction="column"
                gap={5}
            >
                <SubjectTextField control={control} />
                <BodyTextField control={control} />
                <ControlledCheckboxInput
                    control={control}
                    name="sendToCompanyCcEmails"
                    label="Send to company CC emails"
                />
                <Stack
                    overflow="hidden"
                    maxHeight="470px"
                    height="100%"
                    minHeight="470px"
                >
                    <MiniTableStyled.Container sx={{ overflow: 'auto' }}>
                        <MiniTableStyled.CommonTable
                            stickyHeader
                            size="small"
                            width="100%"
                        >
                            <MiniTableHeader
                                turnOffBorder

                                // @ts-ignore
                                // eslint-disable-next-line react/jsx-props-no-multi-spaces
                                columns={columns}
                                fontSize="medium"
                            />
                            <TableBody>
                                {!defaultRows.length ? (
                                    <MiniTableNoItems colSpan={columns.length} />
                                ) : (
                                    defaultRows.map((row, rowIndex) => (
                                        <Row
                                            key={row.orderId}
                                            row={row}
                                            control={control}
                                            rowIndex={rowIndex}
                                            isSelected={selectedRow === row.orderId}
                                            setSelectedRow={setSelectedRow}
                                        />
                                    ))
                                )}
                            </TableBody>
                        </MiniTableStyled.CommonTable>
                    </MiniTableStyled.Container>
                </Stack>
            </Stack>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <Button
                    size="large"
                    sx={{
                        minWidth: '120px'
                    }}
                    variant="contained"
                    onClick={handleSubmit(submit)}
                >
                    {t('common:button.send')}
                </Button>
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
