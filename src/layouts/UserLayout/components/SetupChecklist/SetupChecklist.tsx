import { Stack } from '@mui/material';
import { useGetOnBoardingSeries } from '@/store/home/hooks';
import Link from 'next/link';
import * as React from 'react';
import { useAppSelector } from '@/store/hooks';
import { appHideOnboardingSelector } from '@/store/app/slectors';
import SetupChecklistNavCollapsed from '@/layouts/UserLayout/components/SetupChecklist/SetupChecklistNavCollapsed';
import SetupChecklistNavNotCollapsed from '@/layouts/UserLayout/components/SetupChecklist/SetupChecklistNavNotCollapsed';
import { usePermissions } from '@/store/app/hooks';
import { PERMISSIONS } from '@/models/permissions/permissions';

type Props = {
    navCollapsed: boolean;
};

export default function SetupChecklist({ navCollapsed }: Props) {
    const isHideOnboarding = useAppSelector(appHideOnboardingSelector);
    const { percentage } = useGetOnBoardingSeries();
    const { permissions } = usePermissions();

    if (!permissions) return null;

    if (isHideOnboarding || !permissions[PERMISSIONS.HOME_PAGE]) return null;
    return (
        <Link href="/home">
            <Stack
                overflow="hidden"
                flexShrink={0}
                height="64px"
                paddingX={navCollapsed ? 0 : '16px'}
                borderRadius="8px"
                justifyContent="center"
                alignItems="center"
                margin={navCollapsed ? '8px 6px' : '8px 16px'}
                sx={{
                    cursor         : 'pointer',
                    transition     : 'margin 0.2s ease',
                    backgroundColor: (theme) => theme.palette.semantic.foreground.brand.secondary,
                    color          : (theme) => theme.palette.semantic.text.brand.primary
                }}
            >
                {!navCollapsed ? (
                    <SetupChecklistNavCollapsed percentage={percentage} />
                ) : (
                    <SetupChecklistNavNotCollapsed percentage={percentage} />
                )}
            </Stack>
        </Link>
    );
}
