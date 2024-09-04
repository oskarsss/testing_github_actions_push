import { Stack, Typography } from '@mui/material';
import Avatar from '@/views/accounting/dispatchers/Avatar';
import { getPublicURL } from '@/configs/storage';
import Dispatch from '@/store/accounting/dispatchers/types';
import { CSSProperties } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { formatCurrency } from '@/views/accounting/dispatchers/sections/content/stats/utils';
import { NumbersAfterDot } from '@/views/accounting/dispatchers/sections/content/stats/Chart';

type Props = {
    dispatcher: Dispatch.ConverterDispatcher;
    background: CSSProperties['backgroundColor'];
};

export default function Dispatcher({
    dispatcher,
    background
}: Props) {
    const { t } = useAppTranslation();
    const formattedGrossAmount = formatCurrency(dispatcher.stats?.avgRpm, NumbersAfterDot.TWO);

    return (
        <Stack
            key={dispatcher.dispatcherId}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="semantic.foreground.secondary"
            borderRadius="4px"
            padding="8px"
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="6px"
            >
                <Typography
                    minWidth="8px"
                    height="8px"
                    bgcolor={background}
                    borderRadius="50%"
                />

                <Avatar
                    url={getPublicURL(dispatcher.selfieThumbUrl)}
                    fullName={dispatcher.fullName}
                    styles={{
                        width   : '20px',
                        height  : '20px',
                        fontSize: '14px'
                    }}
                />

                <Typography
                    variant="body1"
                    color="semantic.text.secondary"
                >
                    {dispatcher.fullName || t('common:not_available')}
                </Typography>
            </Stack>

            <Typography
                variant="body1"
                fontWeight={600}
            >
                {formattedGrossAmount}
            </Typography>
        </Stack>
    );
}
