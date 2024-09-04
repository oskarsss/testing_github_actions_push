import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useBrokersMap, useCustomersMap } from '@/store/hash_maps/hooks';
import { useEditLoadClientDialog } from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-client-select/EditLoadClientDialog';

type Props = {
    isBrokerSelected: boolean;
    brokerId: string;
    customerId: string;
    loadId: string;
    referenceId: string;
};

export default function LoadClientSelect({
    isBrokerSelected,
    brokerId,
    customerId,
    loadId,
    referenceId
}: Props) {
    const { t } = useAppTranslation('entity');
    const editLoadClientDialog = useEditLoadClientDialog();
    const entityId = isBrokerSelected ? brokerId : customerId;

    const brokersMap = useBrokersMap();
    const customerMap = useCustomersMap();
    const broker = brokersMap[brokerId];
    const customer = customerMap[customerId];

    const openDialog = () => {
        editLoadClientDialog.open({
            isBrokerSelected,
            brokerId,
            customerId,
            loadId,
            referenceId
        });
    };

    const label = t(isBrokerSelected ? 'broker' : 'customer');

    return (
        <FormControl
            fullWidth
            variant="filled"
            size="small"
        >
            <InputLabel
                id="client_id"
                shrink
                required
            >
                {label}
            </InputLabel>
            <Select
                labelId="client_id"
                name="client_id"
                value={entityId}
                readOnly
                onClick={openDialog}
                label={label}
            >
                {isBrokerSelected ? (
                    <MenuItem value={entityId}>{broker?.nameAndMc}</MenuItem>
                ) : (
                    <MenuItem value={entityId}>{customer?.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}
