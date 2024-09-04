import { Stack, Typography } from '@mui/material';
import { getPublicURL } from '@/configs/storage';
import Dispatch from '@/store/accounting/dispatchers/types';
import Avatar from '@/views/accounting/dispatchers/Avatar';
import DispatchersIcons from '@/views/accounting/dispatchers/sections/content/tables/icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    dispatcher: Dispatch.ConverterDispatcher;
};

export default function Dispatcher({ dispatcher }: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            gap="6px"
            padding="4px 10px"
            borderBottom="1px solid"
            bgcolor="semantic.foreground.secondary"
            borderColor="semantic.border.tertiary"
            borderRadius="12px 12px 0 0"
        >
            <Stack
                direction="row"
                gap="4px"
                alignItems="center"
            >
                <Avatar
                    url={getPublicURL(dispatcher.selfieThumbUrl)}
                    fullName={dispatcher.fullName}
                    styles={{
                        width   : '16px',
                        height  : '16px',
                        fontSize: '12px'
                    }}
                />
                <Typography
                    variant="body1"
                    fontSize="12px"
                    fontWeight="500"
                >
                    {dispatcher.fullName || t('common:not_available')}
                </Typography>
            </Stack>

            <Stack
                direction="row"
                borderRadius="4px"
                bgcolor="semantic.foreground.quarterary"
                padding="0 4px"
                gap="3px"
                alignItems="center"
            >
                <DispatchersIcons.TruckIcon
                    sx={{
                        fill: (theme) => theme.palette.utility.foreground.success.primary
                    }}
                />

                <Typography
                    variant="body1"
                    fontSize="12px"
                    fontWeight="500"
                    color="semantic.text.white"
                    sx={{
                        transform: 'scaleX(0.8)'
                    }}
                >
                    {dispatcher.activeTrucks} / {dispatcher.amountOfTrucks}
                </Typography>
            </Stack>
        </Stack>
    );
}
