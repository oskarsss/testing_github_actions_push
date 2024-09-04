import { Stack, styled, Typography } from '@mui/material';

import Avatar from '@/views/accounting/dispatchers/Avatar';
import Dispatch from '@/store/accounting/dispatchers/types';
import { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

const CustomTypography = styled(Typography)(({ theme }) => ({
    color     : theme.palette.semantic.text.secondary,
    fontSize  : '12px',
    lineHeight: '13px'
}));

type Props = {
    truck: Dispatch.Truck;
};

function Driver({ truck }: Props) {
    const { t } = useAppTranslation();
    const { url } = usePrivateFileUrl(truck.driver?.selfie_thumb_url);

    return (
        <Stack
            direction="row"
            gap="4px"
            alignItems="center"
        >
            <Avatar
                url={url}
                fullName={truck.driver?.fullName || ''}
                styles={{
                    width   : '24px',
                    height  : '24px',
                    fontSize: '16px'
                }}
            />

            <Stack>
                <CustomTypography fontWeight={500}>
                    {truck.driver?.fullName ?? t('common:empty.no_driver')}
                </CustomTypography>

                <CustomTypography>
                    {truck?.truck_id
                        ? `${truck?.year} ${truck?.model}`
                        : t('common:empty.no_truck')}
                </CustomTypography>
            </Stack>
        </Stack>
    );
}

export default memo(Driver);
