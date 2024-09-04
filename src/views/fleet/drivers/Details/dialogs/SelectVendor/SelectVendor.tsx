import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import VendorSelect from '@/@core/fields/select/VendorSelect';
import { MenuProps } from '@/views/fleet/drivers/Details/menus/types';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { TestIDs } from '@/configs/tests';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';

type Data = {
    vendor_id: string;
};

const schema: yup.ObjectSchema<Data> = yup.object().shape({
    vendor_id: yup.string().required()
});

const default_values: Data = {
    vendor_id: ''
};

export const useSelectVendorDialog = hookFabric(SelectVendor, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="400px"
        {...props}
    />
));

export default function SelectVendor({ id }: MenuProps) {
    const dialog = useSelectVendorDialog(true);
    const [assignVendor, { isLoading }] = DriversGrpcService.useAssignVendorToDriverMutation();

    const {
        handleSubmit,
        control,
        formState: { isDirty }
    } = useForm({
        defaultValues: default_values,
        resolver     : yupResolver(schema)
    });

    const create: SubmitHandler<Data> = (data) => {
        assignVendor({
            driverId: id,
            vendorId: data.vendor_id
        }).unwrap();
        dialog.close();
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(create)}>
            <DialogComponents.Header title="drivers:profile.right.vendor.dialog.select.header.title" />

            <DialogComponents.Field xs={12}>
                <VendorSelect
                    autoFocus
                    control={control}
                    name="vendor_id"
                    label="drivers:profile.right.vendor.dialog.select.fields.vendor_id.label"
                    testOptions={{
                        inputTestID: TestIDs.pages.driverProfile.fields.vendor,
                        addTestId  : TestIDs.pages.driverProfile.buttons.addVendor
                    }}
                />
            </DialogComponents.Field>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />

                <DialogComponents.SubmitButton
                    loading={isLoading}
                    disabled={!isDirty || isLoading}
                    text="common:button.confirm"
                    testID={TestIDs.pages.driverProfile.buttons.confirmAddingVendor}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
