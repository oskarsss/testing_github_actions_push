import moment from 'moment-timezone';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { reset_config } from '@/configs/reset-from-config';

import { schema } from '@/views/dispatch/orders/menus/invoice-payment/schema';
import {
    default_values,
    DefaultValues,
    format
} from '@/views/dispatch/orders/menus/invoice-payment/DefaultValues';
import MenuComponents from '@/@core/ui-kits/menus';
import InvoicePaymentMenu from '@/views/dispatch/orders/menus/invoice-payment/InvoicePaymentMenu';
import LoadsTypes from '@/store/dispatch/loads/types';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import LoadInvoicePaymentsGrpcService from '@/@grpcServices/services/loads-service/load-invoice-payments.service';

const formationDefaultValues = (item?: LoadsTypes.InvoicePaymentItem): DefaultValues => {
    if (!item) return default_values;

    return {
        amount              : item.amountFloat,
        receiver_entity_type: item.receiverEntityType,
        paid_on             : item.paidOn || '',
        description         : item.description
    };
};

type Props = {
    load_id: string;
    item: LoadsTypes.InvoicePaymentItem;
    invalidateSettlement?: () => void;
};

export const useEditInvoicePaymentMenu = menuHookFabric(EditInvoicePaymentMenu);

export default function EditInvoicePaymentMenu({
    load_id,
    item,
    invalidateSettlement
}: Props) {
    const editInvoicePaymentMenu = useEditInvoicePaymentMenu(true);
    const methods = useForm<DefaultValues>({
        defaultValues: default_values,
        values       : formationDefaultValues(item),
        resolver     : yupResolver(schema)
    });

    const [updateInvoicePayment, { isLoading: isUpdateLoading }] =
        LoadInvoicePaymentsGrpcService.useUpdateInvoicePaymentItemMutation();

    const [deleteInvoicePayment, { isLoading: isDeleteLoading }] =
        LoadInvoicePaymentsGrpcService.useDeleteInvoicePaymentItemMutation();

    const successful = () => {
        editInvoicePaymentMenu.close();
        methods.reset(default_values, reset_config);
    };

    const submit = (body: DefaultValues) => {
        updateInvoicePayment({
            loadId              : load_id,
            description         : body.description,
            invoicePaymentItemId: item.invoicePaymentItemId,
            amount              : body.amount,
            paidOn              : body.paid_on ? moment.utc(body.paid_on).format(format) : '',
            receiverEntityType  : body.receiver_entity_type
        })
            .unwrap()
            .then(() => {
                successful();
                if (invalidateSettlement) {
                    invalidateSettlement();
                }
            });
    };

    const deleteItem = () => {
        deleteInvoicePayment({
            invoicePaymentItemId: item.invoicePaymentItemId,
            loadId              : load_id
        })
            .unwrap()
            .then(() => {
                successful();
                if (invalidateSettlement) {
                    invalidateSettlement();
                }
            });
    };

    return (
        <InvoicePaymentMenu
            methods={methods}
            submit={submit}
            title="modals:loads.invoice_payment.titles.edit"
        >
            <MenuComponents.ActionsWrapper>
                <MenuComponents.CancelButton onCancel={editInvoicePaymentMenu.close} />
                <MenuComponents.DeleteButton
                    onClick={deleteItem}
                    loading={isDeleteLoading}
                    disabled={isUpdateLoading}
                />
                <MenuComponents.SubmitButton
                    loading={isUpdateLoading}
                    disabled={isDeleteLoading || !methods.formState.isDirty}
                    text="common:button.update"
                />
            </MenuComponents.ActionsWrapper>
        </InvoicePaymentMenu>
    );
}
