import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { reset_config } from '@/configs/reset-from-config';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { REVENUE_TYPE_TO_GRPC } from '@/models/settlements/settlement-revenue-types';
import RevenueTypesGrpcService from '@/@grpcServices/services/settlements-service/revenue-types.service';
import { DefaultValues, default_values, schema } from './helpers';
import ItemDialog from './ItemDialog';

export const useAddItemDialog = hookFabric(AddItemDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="500px"
    />
));

type Props = {
    query_id: string;
};
export default function AddItemDialog({ query_id }: Props) {
    const dialog = useAddItemDialog(true);

    const [trigger, { isLoading }] = RevenueTypesGrpcService.useAddRevenueTypeItemMutation();

    const methods = useForm<DefaultValues>({
        defaultValues: default_values,
        resolver     : yupResolver<DefaultValues>(schema)
    });

    const submit = (body: DefaultValues) => {
        if (!body.amount) return;

        trigger({
            amount       : body.amount,
            revenueTypeId: query_id,
            type         : REVENUE_TYPE_TO_GRPC[body.type]
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
            title="settings:settlements.revenue_types.item.dialog.add.header.title"
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="create"
                submitDisabled={!methods.formState.isDirty}
            />
        </ItemDialog>
    );
}
