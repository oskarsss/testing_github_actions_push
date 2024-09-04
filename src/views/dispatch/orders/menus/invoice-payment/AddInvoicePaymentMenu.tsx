import InvoicePaymentMenu from '@/views/dispatch/orders/menus/invoice-payment/InvoicePaymentMenu';
import MenuComponents from '@/@core/ui-kits/menus';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment-timezone';
import { reset_config } from '@/configs/reset-from-config';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import LoadsTypes from '@/store/dispatch/loads/types';
import LoadInvoicePaymentsGrpcService from '@/@grpcServices/services/loads-service/load-invoice-payments.service';
import { DefaultValues, default_values, format } from './DefaultValues';
import { schema } from './schema';

type Props = {
    load_id: LoadsTypes.Load.Load['loadId'];
    invalidateSettlement: () => void;
};

export const useAddInvoicePaymentMenu = menuHookFabric(AddInvoicePaymentMenu);

function AddInvoicePaymentMenu({
    load_id,
    invalidateSettlement
}: Props) {
    const addInvoicePaymentMenu = useAddInvoicePaymentMenu(true);
    const methods = useForm<DefaultValues>({
        defaultValues: default_values,
        resolver     : yupResolver<DefaultValues>(schema)
    });

    const [addInvoicePayment, { isLoading }] =
        LoadInvoicePaymentsGrpcService.useAddInvoicePaymentItemMutation();

    const submit = (body: DefaultValues) => {
        addInvoicePayment({
            receiverEntityType: body.receiver_entity_type,
            loadId            : load_id,
            paidOn            : body.paid_on ? moment.utc(body.paid_on).format(format) : '',
            description       : body.description,
            amount            : body.amount
        })
            .unwrap()
            .then(() => {
                addInvoicePaymentMenu.close();
                invalidateSettlement();
                methods.reset(default_values, reset_config);
            });
    };
    return (
        <InvoicePaymentMenu
            methods={methods}
            submit={submit}
            title="modals:loads.invoice_payment.titles.add"
        >
            <MenuComponents.ActionsWrapper>
                <MenuComponents.CancelButton onCancel={addInvoicePaymentMenu.close} />
                <MenuComponents.SubmitButton
                    disabled={!methods.formState.isDirty}
                    loading={isLoading}
                    text="common:button.add"
                />
            </MenuComponents.ActionsWrapper>
        </InvoicePaymentMenu>
    );
}
