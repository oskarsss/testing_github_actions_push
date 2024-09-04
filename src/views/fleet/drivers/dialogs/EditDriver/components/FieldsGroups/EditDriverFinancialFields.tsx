import FullDialog from '@/@core/ui-kits/full-dialog';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import VendorSelect from '@/@core/fields/select/VendorSelect';
import SettlementCycleSelect from '@/@core/fields/select/settlement-cycle-select/SettlementCycleSelect';
import SettlementRevenueTypeSelect from '@/@core/fields/select/SettlementRevenueTypeSelect';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import { TestIDs } from '@/configs/tests';
import edit_driver_options from '@/views/fleet/drivers/dialogs/EditDriver/edit_driver_options';
import { useEditDriverForm } from '../../EditDriverForm';

export default function EditDriverFinancialFields() {
    const { t } = useAppTranslation();
    const {
        control,
        formState: { errors }
    } = useEditDriverForm();

    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={<VectorIcons.FullDialogIcons.FinancialInfo />}
                title="modals:drivers.edit.block_title.financial"
            />

            <FullDialog.Field xs={6}>
                <SettlementRevenueTypeSelect
                    control={control}
                    testID={TestIDs.pages.editDriver.fields.revenueType}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <SettlementCycleSelect
                    control={control}
                    testID={TestIDs.pages.editDriver.fields.cycle}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <VendorSelect
                    control={control}
                    label="fields:vendor.label"
                    testOptions={{
                        inputTestID: TestIDs.pages.editDriver.fields.vendor,
                        addTestId  : TestIDs.pages.editDriver.buttons.addVendor
                    }}
                    name="vendorId"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <SelectInput
                    width="100%"
                    name="payoutReceiver"
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.payoutReceiver}
                    label="modals:drivers.edit.fields.payout_receiver.label"
                    options={edit_driver_options.payout_receiver_options(t)}
                />
            </FullDialog.Field>
        </>
    );
}
