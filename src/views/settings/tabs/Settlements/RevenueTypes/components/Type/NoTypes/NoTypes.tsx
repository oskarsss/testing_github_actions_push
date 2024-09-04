import Box from '@mui/material/Box';
import SettingsEmptyScreen, { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import { useAddRevenueTypeDialog } from '@/views/settings/tabs/Settlements/RevenueTypes/dialogs/RevenueTypeDialog/AddRevenueTypeDialog';
import { VIEW_NAME } from '@/views/settings/tabs/Settlements/RevenueTypes/RevenueTypes';

type Props = {
    view_name?: VIEW_NAME;
};

export default function NoTypes({ view_name }: Props) {
    const dialog = useAddRevenueTypeDialog();
    const openAddRevenueTypeDialog = () => dialog.open({});

    return (
        <Box
            position="relative"
            minHeight="80vh"
        >
            <SettingsEmptyScreen
                type={
                    view_name === VIEW_NAME.ACTIVE
                        ? FallbackType.REVENUE_TYPES_ACTIVE
                        : FallbackType.REVENUE_TYPES_DEACTIVATED
                }
                onClickFallback={openAddRevenueTypeDialog}
            />
        </Box>
    );
}
