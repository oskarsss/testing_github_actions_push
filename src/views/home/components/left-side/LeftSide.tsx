import { Stack } from '@mui/material';
import LeftSideHeader from '@/views/home/components/left-side/on-boarding-header/LeftSideHeader';
import LeftSideSetupProfile from '@/views/home/components/left-side/on-boarding-setup-profile/LeftSideSetupProfile';
import LeftSideSetupFleet from '@/views/home/components/left-side/on-boarding-setup-fleet/LeftSideSetupFleet';
import LeftSideSetupIntegration from '@/views/home/components/left-side/on-boarding-setup-integration/LeftSideSetupIntegration';
import LeftSideSetupPayroll from '@/views/home/components/left-side/on-boarding-setup-payroll/LeftSideSetupPayroll';
import LeftSideSetupConfiguration from '@/views/home/components/left-side/on-boarding-setup-configuration/LeftSideSetupConfiguration';

export default function LeftSide() {
    return (
        <Stack
            alignItems="stretch"
            gap="16px"
            width="100%"
            minHeight="100%"
        >
            <LeftSideHeader />
            <LeftSideSetupProfile />
            <LeftSideSetupPayroll />
            <LeftSideSetupFleet />
            <LeftSideSetupIntegration />
            <LeftSideSetupConfiguration />
        </Stack>
    );
}
