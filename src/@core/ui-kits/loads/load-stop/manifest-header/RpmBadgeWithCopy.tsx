import Badge from '@/@core/ui-kits/basic/badge/Badge';
import CopyText from '@/@core/components/copy-text/CopyText';
import React from 'react';
import { IChipColors } from '@/@core/theme/chip';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    size?: 'small' | 'medium';
    statusColor: IChipColors;
    rpmAmountFormatted: string;
};

export default function RpmBadgeWithCopy({
    size = 'medium',
    statusColor,
    rpmAmountFormatted
}: Props) {
    const { t } = useAppTranslation();

    return (
        <CopyText text={rpmAmountFormatted}>
            <span style={{ overflow: 'hidden' }}>
                <Badge
                    variant="outlined"
                    text={
                        size === 'medium'
                            ? `${t('common:rpm')}: ${rpmAmountFormatted}`
                            : rpmAmountFormatted
                    }
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.utility.foreground[statusColor]?.tertiary,
                        color       : (theme) => theme.palette.utility.text[statusColor],
                        overflow    : 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace  : 'nowrap'
                    }}
                />
            </span>
        </CopyText>
    );
}
