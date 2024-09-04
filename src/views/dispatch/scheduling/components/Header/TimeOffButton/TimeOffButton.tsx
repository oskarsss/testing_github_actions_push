import { TestIDs } from '@/configs/tests';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAddTimeOffDialog } from '@/views/dispatch/scheduling/dialogs/TimeOff/AddTimeOffDialog';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useTheme } from '@mui/material';

export default function TimeOffButton() {
    const addTimeOffDialog = useAddTimeOffDialog();

    const onOpenAddTimeOffDialog = () => {
        addTimeOffDialog.open({});
    };

    const theme = useTheme();

    return (
        <PageHeadersKit.Buttons.Secondary
            onClick={onOpenAddTimeOffDialog}
            testID={TestIDs.pages.dispatchSchedule.buttons.addTimeOff}
            icon={(
                <VectorIcons.AirplanePlus
                    style={{ fill: theme.palette.semantic.foreground.brand.primary }}
                />
            )}
            title="schedule:header.buttons.add_time_off"
        />
    );
}
