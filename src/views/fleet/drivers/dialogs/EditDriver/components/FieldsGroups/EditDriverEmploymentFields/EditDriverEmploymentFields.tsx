import FullDialog from '@/@core/ui-kits/full-dialog';
import TagsSelect from '@/@core/fields/select/tags-select/TagsSelect';
import DateInput from '@/@core/fields/inputs/DateInput';
import VectorIcons from '@/@core/icons/vector_icons';
import { TestIDs } from '@/configs/tests';
import DriverTypesSelect from '@/@core/fields/select/DriverTypesSelect';
import DriversTypes from '@/store/fleet/drivers/types';
import { useEditDriverForm } from '../../../EditDriverForm';
import InsuranceEndorsed from './InsuranceEndorsed';

type Props = {
    driver: DriversTypes.Driver;
};

export default function EditDriverEmploymentFields({ driver }: Props) {
    const {
        control,
        formState: { errors }
    } = useEditDriverForm();

    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={<VectorIcons.FullDialogIcons.EmploymentInfo />}
                title="modals:drivers.edit.block_title.employment"
            />

            <FullDialog.Field xs={6}>
                <DriverTypesSelect
                    control={control}
                    name="driverTypeId"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <DateInput
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.hireDate}
                    name="hireDate"
                    type="date"
                    label="modals:drivers.edit.fields.hire_date.label"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <TagsSelect
                    control={control}
                    errors={errors}
                    inputTestID={TestIDs.pages.editDriver.fields.tag}
                    entityType="DRIVER"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <InsuranceEndorsed
                    driverId={driver.driverId}
                    insuranceEndorsed={driver.insuranceEndorsed}
                />
            </FullDialog.Field>
        </>
    );
}
