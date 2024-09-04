import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import VendorSelect from '@/@core/fields/select/VendorSelect';

// eslint-disable-next-line max-len
export const useAssignVendorToSettlementDialog = hookFabric(
    AssignVendorToSettlementDialog,
    (props) => (
        <DialogComponents.DialogWrapper
            turnOffCloseButton
            {...props}
        />
    )
);

type FormValues = {
    vendor_id: string;
};

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
    vendor_id: yup.string().required()
});

type Props = {
    cycleId: string;
    periodId: string;
    settlementId: string;
    settlementFriendlyId?: number;
};

function AssignVendorToSettlementDialog({
    cycleId,
    periodId,
    settlementId,
    settlementFriendlyId
}: Props) {
    const dialog = useAssignVendorToSettlementDialog(true);

    const [assignVendor, { isLoading }] =
        SettlementsGrpcService.useAssignVendorToSettlementMutation();

    const onUpdateDate = (data: FormValues) => {
        assignVendor({
            cycleId,
            periodId,
            settlementId,
            vendorId: data.vendor_id
        })
            .unwrap()
            .then(dialog.close);
    };

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            isValid
        }
    } = useForm<FormValues>({
        defaultValues: { vendor_id: '' },
        resolver     : yupResolver(schema)
    });

    const friendlyId = settlementFriendlyId ? `#${settlementFriendlyId}` : '';

    return (
        <DialogComponents.Form onSubmit={handleSubmit(onUpdateDate)}>
            <DialogComponents.Header
                title="modals:settlements.assign_vendor.title"
                translationOptions={{ friendlyId }}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <VendorSelect
                        control={control}
                        name="vendor_id"
                        label="entity:vendor"
                        required
                        autoFocus
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    disabled={!isDirty || !isValid}
                    loading={isLoading}
                    text="common:button.assign"
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
