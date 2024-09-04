import Stack from '@mui/material/Stack';
import OverflowTooltip from '@/@core/ui-kits/basic/overflow-tooltip/OverflowTooltip';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    brokerName: string;
};

export default function ClientName({ brokerName }: Props) {
    const { t } = useAppTranslation('common');

    return (
        <Stack
            overflow="hidden"
            fontWeight={500}
            fontSize="14px"
            color="semantic.text.secondary"
            lineHeight="18px"
        >
            <OverflowTooltip
                textOverflow="ellipsis"
                tooltipPlacement="bottom"
            >
                {brokerName || t('not_provided')}
            </OverflowTooltip>
        </Stack>
    );
}
