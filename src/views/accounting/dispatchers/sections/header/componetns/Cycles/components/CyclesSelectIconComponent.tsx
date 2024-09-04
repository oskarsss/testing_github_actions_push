import { Stack } from '@mui/material';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { MouseEvent } from 'react';
import CyclesSelectIconComponentActions from './CyclesSelectIconComponentActions';

type Props = {
    isLoading: boolean;
    selectedCycle?: SettlementsTypes.Cycles.Cycle;
    open: boolean;
    setOpen: (value: boolean) => void;
    onViewDrivers: () => void;
    onViewCycle: () => void;
    onEdit: (cycle_id?: string) => void;
};

export default function CyclesSelectIconComponent({
    isLoading,
    selectedCycle,
    open,
    setOpen,
    onViewDrivers,
    onViewCycle,
    onEdit
}: Props) {
    const toggleOpen = () => setOpen(!open);

    const editCycle = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onEdit(selectedCycle?.cycleId);
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
        >
            <CyclesSelectIconComponentActions
                isLoading={isLoading}
                selectedCycle={selectedCycle}
                onViewDrivers={onViewDrivers}
                onViewCycle={onViewCycle}
                onEditCycle={editCycle}
            />

            <ArrowDropDownSharpIcon
                cursor="pointer"
                onClick={toggleOpen}
                sx={{
                    transform : open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s'
                }}
            />
        </Stack>
    );
}
