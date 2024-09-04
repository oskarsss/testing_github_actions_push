import Badge from '@/@core/ui-kits/basic/badge/Badge';
import CopyText from '@/@core/components/copy-text/CopyText';
import React from 'react';
import { IChipColors } from '@/@core/theme/chip';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    grossAmountFormatted: string;
    size?: 'small' | 'medium';
    statusColor: IChipColors;
};

export default function GrossBadgeWithCopy({
    grossAmountFormatted,
    size = 'medium',
    statusColor
}: Props) {
    const { t } = useAppTranslation();

    return (
        <CopyText text={grossAmountFormatted}>
            <span>
                <Badge
                    variant="outlined"
                    text={
                        size === 'medium'
                            ? `${t('common:gross')}: ${grossAmountFormatted}`
                            : grossAmountFormatted
                    }
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.utility.foreground[statusColor]?.tertiary,
                        color: (theme) => theme.palette.utility.text[statusColor]
                    }}
                />
            </span>
        </CopyText>
    );
}
