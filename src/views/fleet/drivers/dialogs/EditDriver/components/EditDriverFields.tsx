import FullDialog from '@/@core/ui-kits/full-dialog';
import DriversTypes from '@/store/fleet/drivers/types';
import EditDriverEmploymentFields from './FieldsGroups/EditDriverEmploymentFields/EditDriverEmploymentFields';
import EditDriverFinancialFields from './FieldsGroups/EditDriverFinancialFields';
import EditDriverAddressFields from './FieldsGroups/EditDriverAddressFields';
import EditDriverPersonalFields from './FieldsGroups/EditDriverPersonalFields';

type Props = {
    driver: DriversTypes.Driver;
};

export default function EditDriverFields({ driver }: Props) {
    return (
        <FullDialog.Fields>
            <EditDriverPersonalFields />
            <EditDriverAddressFields />
            <EditDriverFinancialFields />
            <EditDriverEmploymentFields driver={driver} />
        </FullDialog.Fields>
    );
}
