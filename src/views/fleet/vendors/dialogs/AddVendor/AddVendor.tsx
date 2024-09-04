import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { TestIDs } from '@/configs/tests';
import TextInput from '@/@core/fields/inputs/TextInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import VendorsGrpcService from '@/@grpcServices/services/vendors.service';
import { VendorModel_Type } from '@proto/models/model_vendor';
import vendor_type_options from '../vendor_type_options';

type DefaultValues = {
    name: string;
    type: VendorModel_Type;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    name: yup.string().required('common:validation.required'),
    type: yup.number<VendorModel_Type>().required('common:validation.required')
});

export const useAddVendorDialog = hookFabric(AddVendor);

type Props = {
    onAdded?: (vendor_id: string) => void;
};

function AddVendor({ onAdded }: Props) {
    const { t } = useAppTranslation();
    const addVendorDialog = useAddVendorDialog(true);
    const [createVendor, { isLoading }] = VendorsGrpcService.useCreateVendorMutation();

    const {
        reset,
        control: accountControl,
        handleSubmit: handleAccountSubmit,
        formState: { errors: accountErrors }
    } = useForm<DefaultValues>({
        defaultValues: {
            name: '',
            type: VendorModel_Type.COMPANY
        },
        resolver: yupResolver(schema)
    });

    const create = (data: DefaultValues) => {
        createVendor({
            name: data.name,
            type: data.type
        })
            .unwrap()
            .then((response) => {
                addVendorDialog.close().then(() => {
                    onAdded?.(response.vendorId);
                    reset();
                });
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleAccountSubmit(create)}>
            <DialogComponents.Header title="common:actions.add_vendor" />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={accountControl}
                        errors={accountErrors}
                        label="modals:vendors.add.fields.name.label"
                        name="name"
                        testID={TestIDs.pages.fleetVendors.fields.vendorsName}
                        placeholder="modals:vendors.add.fields.name.placeholder"
                        type="text"
                        width="100%"
                        autoFocus
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <SelectInput
                        control={accountControl}
                        errors={accountErrors}
                        testID={TestIDs.pages.fleetVendors.fields.vendorsType}
                        label="fields:type.label"
                        name="type"
                        width="100%"
                        options={vendor_type_options(t)}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton
                    onCancel={addVendorDialog.close}
                    testID={TestIDs.pages.fleetVendors.buttons.cancelVendor}
                />
                <DialogComponents.SubmitButton
                    loading={isLoading}
                    type="create"
                    testID={TestIDs.pages.fleetVendors.buttons.confirmVendor}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
