import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reset_config } from '@/configs/reset-from-config';
import {
    defaultValuesInvoiceItem,
    DefaultValuesInvoiceItem
} from '@/views/dispatch/orders/menus/invoice-item/DefaultValuesInvoiceItem';
import { schema } from '@/views/dispatch/orders/menus/invoice-item/schema';
import InvoiceMenu from '@/views/dispatch/orders/menus/invoice-item/InvoiceMenu';
import MenuComponents from '@/@core/ui-kits/menus';
import LoadsTypes from '@/store/dispatch/loads/types';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import LoadInvoiceItemsGrpcService from '@/@grpcServices/services/loads-service/load-invoice-items.service';

const formationDefaultValues = (item?: LoadsTypes.InvoiceItem): DefaultValuesInvoiceItem => {
    if (!item) return defaultValuesInvoiceItem;

    return {
        amount_per_unit: `${item.amountPerUnitFloat}`,
        units          : item.units,
        category_id    : item.categoryId,
        description    : item.description
    };
};

type Props = {
    load_id: string;
    invalidateSettlement?: () => void;
    item: LoadsTypes.InvoiceItem;
};

export const useEditInvoiceItemMenu = menuHookFabric(EditInvoiceItemMenu);

export default function EditInvoiceItemMenu({
    load_id,
    item,
    invalidateSettlement
}: Props) {
    const editInvoiceItemMenu = useEditInvoiceItemMenu(true);
    const methods = useForm<DefaultValuesInvoiceItem>({
        defaultValues: defaultValuesInvoiceItem,
        values       : formationDefaultValues(item),
        resolver     : yupResolver<DefaultValuesInvoiceItem>(schema)
    });

    const [updateInvoiceItem, { isLoading: isUpdating }] =
        LoadInvoiceItemsGrpcService.useUpdateInvoiceItemMutation();

    const [deleteInvoiceItem, { isLoading: isDeleting }] =
        LoadInvoiceItemsGrpcService.useDeleteInvoiceItemMutation();

    const successful = () => {
        editInvoiceItemMenu.close();
        methods.reset(defaultValuesInvoiceItem, reset_config);
    };

    const submit = (data: DefaultValuesInvoiceItem) => {
        updateInvoiceItem({
            invoiceItemId        : item.invoiceItemId,
            loadId               : load_id,
            amountPerUnit        : Number(data.amount_per_unit),
            description          : data.description,
            invoiceItemCategoryId: data.category_id,
            units                : Number(data.units)
        })
            .unwrap()
            .then(() => {
                successful();
                if (invalidateSettlement) invalidateSettlement();
            });
    };

    const deleteItem = () => {
        deleteInvoiceItem({
            loadId       : load_id,
            invoiceItemId: item.invoiceItemId
        })
            .unwrap()
            .then(() => {
                successful();
                if (invalidateSettlement) invalidateSettlement();
            });
    };

    return (
        <InvoiceMenu
            methods={methods}
            submit={submit}
            title="modals:loads.invoice_item.titles.edit"
        >
            <MenuComponents.ActionsWrapper>
                <MenuComponents.CancelButton onCancel={editInvoiceItemMenu.close} />
                <MenuComponents.DeleteButton
                    onClick={deleteItem}
                    disabled={isUpdating}
                    loading={isDeleting}
                />
                <MenuComponents.SubmitButton
                    disabled={isDeleting || isUpdating || !methods.formState.isDirty}
                    loading={isUpdating}
                    text="common:button.update"
                />
            </MenuComponents.ActionsWrapper>
        </InvoiceMenu>
    );
}
