import { IconButton, Tooltip } from '@mui/material';
import SettlementsIcons from '@/views/accounting/settlements/Icons';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    isLoading: boolean;
    selectedCycle?: SettlementsTypes.Cycles.Cycle;
    onViewDrivers: () => void;
    onViewCycle: () => void;
    onEditCycle: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function CycleSelectIconComponentActions({
    isLoading,
    selectedCycle,
    onViewDrivers,
    onViewCycle,
    onEditCycle
}: Props) {
    const { t } = useAppTranslation();

    return (
        !isLoading && (
            <>
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

                {selectedCycle && (
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
                )}
            </>
        )
    );
}
