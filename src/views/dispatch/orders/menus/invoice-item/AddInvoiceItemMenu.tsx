import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MenuComponents from '@/@core/ui-kits/menus';
import { reset_config } from '@/configs/reset-from-config';
import {
    defaultValuesInvoiceItem,
    DefaultValuesInvoiceItem
} from '@/views/dispatch/orders/menus/invoice-item/DefaultValuesInvoiceItem';
import { schema } from '@/views/dispatch/orders/menus/invoice-item/schema';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import LoadInvoiceItemsGrpcService from '@/@grpcServices/services/loads-service/load-invoice-items.service';
import InvoiceMenu from './InvoiceMenu';

type Props = {
    load_id: string;
    invalidateSettlement?: () => void;
};

export const useAddInvoiceItemMenu = menuHookFabric(AddInvoiceItemMenu);

export default function AddInvoiceItemMenu({
    load_id,
    invalidateSettlement
}: Props) {
    const addInvoiceItemMenu = useAddInvoiceItemMenu(true);
    const methods = useForm<DefaultValuesInvoiceItem>({
        defaultValues: defaultValuesInvoiceItem,
        resolver     : yupResolver<DefaultValuesInvoiceItem>(schema)
    });

    const [addInvoiceItem, { isLoading }] = LoadInvoiceItemsGrpcService.useAddInvoiceItemMutation();

    const submit = (data: DefaultValuesInvoiceItem) => {
        addInvoiceItem({
            amountPerUnit        : Number(data.amount_per_unit),
            description          : data.description,
            invoiceItemCategoryId: data.category_id,
            loadId               : load_id,
            units                : Number(data.units)
        })
            .unwrap()
            .then(() => {
                addInvoiceItemMenu.close();
                methods.reset(defaultValuesInvoiceItem, reset_config);
                if (invalidateSettlement) invalidateSettlement();
            });
    };

    return (
        <InvoiceMenu
            methods={methods}
            submit={submit}
            title="modals:loads.invoice_item.titles.add"
        >
            <MenuComponents.ActionsWrapper>
                <MenuComponents.CancelButton onCancel={addInvoiceItemMenu.close} />
                <MenuComponents.SubmitButton
                    disabled={!methods.formState.isDirty}
                    loading={isLoading}
                    text="common:button.add"
                />
            </MenuComponents.ActionsWrapper>
        </InvoiceMenu>
    );
}
