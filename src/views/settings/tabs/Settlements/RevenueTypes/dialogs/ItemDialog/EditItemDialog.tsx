import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { reset_config } from '@/configs/reset-from-config';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import SettlementsTypes from '@/store/accounting/settlements/types';
import {
    REVENUE_TYPE_GRPC,
    REVENUE_TYPE_TO_GRPC
} from '@/models/settlements/settlement-revenue-types';
import RevenueTypesGrpcService from '@/@grpcServices/services/settlements-service/revenue-types.service';
import { Settlements_RevenueType_Item_Type } from '@proto/models/model_settlement';
import { DefaultValues, default_values, schema } from './helpers';
import ItemDialog from './ItemDialog';

export const useEditItemDialog = hookFabric(EditItemDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="500px"
    />
));

const formatAmount = (amount: number, type: Settlements_RevenueType_Item_Type) => {
    switch (type) {
    case Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_LOAD:
        return Math.round(amount * 100);
    case Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_COMPANY_NET:
        return Math.round(amount * 100);
    default:
        return amount;
    }
};

const prepareFormAmount = (amount: number, type: Settlements_RevenueType_Item_Type) => {
    switch (type) {
    case Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_LOAD:
        return amount / 100;
    case Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_COMPANY_NET:
        return amount / 100;
    default:
        return amount;
    }
};

type Props = {
    item: SettlementsTypes.RevenueTypes.Item;
    query_id: string;
};
export default function EditItemDialog({
    item,
    query_id
}: Props) {
    const dialog = useEditItemDialog(true);
    const [updateItem, { isLoading }] = RevenueTypesGrpcService.useUpdateRevenueTypeItemMutation();

    const values = {
        amount: formatAmount(item.amount, item.type),
        type  : REVENUE_TYPE_GRPC[item.type]
    };

    const methods = useForm<DefaultValues>({
        values,
        resolver: yupResolver<DefaultValues>(schema)
    });

    const submit = (body: DefaultValues) => {
        if (!body.amount) return;
        const formattedType = REVENUE_TYPE_TO_GRPC[body.type];
        const preparedAmount = prepareFormAmount(body.amount, formattedType);

        updateItem({
            amount       : preparedAmount,
            itemId       : item.itemId,
            revenueTypeId: query_id,
            type         : formattedType
        })
            .unwrap()
            .then(() => {
                dialog.close();
                methods.reset(default_values, reset_config);
            });
    };

    return (
        <ItemDialog
            methods={methods}
            submit={submit}
            title="settings:settlements.revenue_types.item.dialog.edit.header.title"
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="update"
                submitDisabled={!methods.formState.isDirty}
            />
        </ItemDialog>
    );
}
