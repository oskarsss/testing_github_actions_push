import { useAppTranslation } from '@/hooks/useAppTranslation';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useUsersMap } from '@/store/hash_maps/hooks';
import { useEditLoadDispatcherDialog } from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-dispather/EditLoadDispatcherDialog';

type Props = {
    dispatcherId: string;
    loadId: string;
};

export default function LoadDispatcherField({
    dispatcherId = '',
    loadId
}: Props) {
    const { t } = useAppTranslation('modals');
    const usersMap = useUsersMap();
    const dialog = useEditLoadDispatcherDialog();

    const user = usersMap[dispatcherId];

    const openDialog = () => {
        dialog.open({
            dispatcherId,
            loadId
        });
    };

    return (
        <FormControl
            fullWidth
            variant="filled"
            size="small"
        >
            <InputLabel
                id="dispatcher_id"
                shrink
            >
                {t('loads.edit_load.fields.titles.booking_dispatcher')}
            </InputLabel>
            <Select
                labelId="dispatcher_id"
                name="dispatcher_id"
                value={dispatcherId}
                readOnly
                onClick={openDialog}
                label={t('loads.edit_load.fields.titles.booking_dispatcher')}
            >
                {user && (
                    <MenuItem value={dispatcherId}>{`${user.firstName} ${user.lastName}`}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}
