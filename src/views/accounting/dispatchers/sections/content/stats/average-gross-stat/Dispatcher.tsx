import { Stack, Typography } from '@mui/material';
import Avatar from '@/views/accounting/dispatchers/Avatar';
import { getPublicURL } from '@/configs/storage';
import Dispatch from '@/store/accounting/dispatchers/types';
import { CSSProperties } from 'react';
import TruckChip from '@/views/accounting/dispatchers/sections/content/stats/average-gross-stat/TruckChip';
import { formatCurrency } from '@/views/accounting/dispatchers/sections/content/stats/utils';
import { NumbersAfterDot } from '@/views/accounting/dispatchers/sections/content/stats/Chart';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    dispatcher: Dispatch.ConverterDispatcher;
    background: CSSProperties['backgroundColor'];
};

export default function Dispatcher({
    dispatcher,
    background
}: Props) {
    const { t } = useAppTranslation();
    const formattedGrossAmount = formatCurrency(
        dispatcher.stats?.grossAmount,
        NumbersAfterDot.ZERO
    );

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="semantic.foreground.secondary"
            borderRadius="4px"
            padding="8px"
            gap="8px"
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="6px"
                flex="1"
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
                    fontSize="14px"
                >
                    {dispatcher.fullName || t('common:not_available')}
                </Typography>
            </Stack>

            <TruckChip trucks={dispatcher.trucks} />

            <Typography
                variant="body1"
                fontWeight={600}
            >
                {formattedGrossAmount}
            </Typography>
        </Stack>
    );
}
