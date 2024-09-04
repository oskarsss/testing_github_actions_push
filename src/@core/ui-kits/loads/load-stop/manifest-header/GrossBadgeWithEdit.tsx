import { Tooltip } from '@mui/material';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import React from 'react';
import { useOverrideEditGrossDialog } from '@/views/dispatch/manifests/modals/overrides/OverrideEditGross';
import { IChipColors } from '@/@core/theme/chip';
import { Amount } from '@proto/models/amount';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    gross: Amount;
    size?: 'small' | 'medium';
    statusColor: IChipColors;
    manifestId: string;
};

export default function GrossBadgeWithEdit({
    gross,
    size = 'medium',
    statusColor,
    manifestId
}: Props) {
    const { t } = useAppTranslation();
    const editGrossDialog = useOverrideEditGrossDialog();

    const openEditGrossDialog = () => {
        editGrossDialog.open({
            manifestId,
            gross
        });
    };

    return (
        <Tooltip
            title={t('common:tooltips.click_to_edit')}
            disableInteractive
        >
            <span>
                <Badge
                    variant="outlined"
                    text={
                        size === 'medium'
                            ? `${t('common:gross')}: ${gross.amountFormatted}`
                            : gross.amountFormatted
                    }
                    onClick={openEditGrossDialog}
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.utility.foreground[statusColor]?.tertiary,
                        color     : (theme) => theme.palette.utility.text[statusColor],
                        cursor    : 'pointer',
                        opacity   : 1,
                        transition: 'opacity 0.3s',
                        '&:hover' : {
                            opacity: 0.7
                        }
                    }}
                />
            </span>
        </Tooltip>
    );
}
