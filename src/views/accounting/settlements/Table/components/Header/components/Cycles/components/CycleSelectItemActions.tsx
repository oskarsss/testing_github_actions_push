import { IconButton, Stack, Tooltip } from '@mui/material';
import SettlementsIcons from '@/views/accounting/settlements/Icons';
import { MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    onViewDrivers: () => void;
    onViewCycle: () => void;
    onEditCycle: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function CycleSelectItemActions({
    onViewDrivers,
    onViewCycle,
    onEditCycle
}: Props) {
    const { t } = useAppTranslation();

    return (
        <Stack
            direction="row"
            alignItems="center"
        >
            <Tooltip
                disableInteractive
                title={t('fields:cycles.tooltips.view_drivers')}
            >
                <IconButton
                    size="small"
                    onClick={onViewDrivers}
                    aria-label="View drivers"
                >
                    <SettlementsIcons.Driver />
                </IconButton>
            </Tooltip>
            <Tooltip
                disableInteractive
                title={t('fields:cycles.tooltips.view_all_cycles')}
            >
                <IconButton
                    size="small"
                    onClick={onViewCycle}
                    aria-label="View all cycles"
                >
                    <SettlementsIcons.ViewMore />
                </IconButton>
            </Tooltip>
            <Tooltip
                disableInteractive
                title={t('fields:cycles.tooltips.edit_cycle')}
            >
                <IconButton
                    onClick={onEditCycle}
                    size="small"
                    aria-label="Edit cycle"
                >
                    <SettlementsIcons.Edit />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}
