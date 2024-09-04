import { MouseEvent } from 'react';
import { TestIDs } from '@/configs/tests';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useCapListMenu } from '../../../dialogs/CapList/CapList';

export default function CapListButton() {
    const capListMenu = useCapListMenu();
    const openCapList = (event: MouseEvent<HTMLButtonElement>) => {
        capListMenu.open({})({ ...event, clientY: 65 });
    };

    return (
        <PageHeadersKit.Buttons.Secondary
            onClick={openCapList}
            testID={TestIDs.pages.dispatchSchedule.buttons.capList}
            variant="outlined"
            icon={<FormatListNumberedIcon sx={{ fontSize: '20px' }} />}
            title="schedule:header.buttons.cap_list"
        />
    );
}
