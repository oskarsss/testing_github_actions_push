import { useActiveCycle } from '@/store/accounting/settlements/hooks/settlements';
import { OutlinedInput, Typography } from '@mui/material';
import { useEditCycleDialog } from '@/views/settings/tabs/Settlements/Cycles/dialogs/EditCycleDialog';
import { KeyboardEvent, useCallback, useMemo, useState } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import SettlementsIcons from '@/views/accounting/settlements/Icons';
import { useDispatchersCycleId } from '@/store/accounting/dispatchers/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import CyclesSelectList from './components/CyclesSelectList';
import CyclesSelectIconComponent from './components/CyclesSelectIconComponent';
import CyclesStyled from './styled';

export default function DispatchersCycleSelect() {
    const { t } = useAppTranslation();
    const cycleId = useDispatchersCycleId();
    const [open, setOpen] = useState(false);
    const {
        cycles,
        isLoading
    } = useActiveCycle();

    const editCycleDialog = useEditCycleDialog(false);

    const handleClickEdit = (cycle_id?: string) => {
        if (!cycle_id) return;
        const editedCycle = cycles.find((cycle) => cycle.cycleId === cycle_id);
        if (!editedCycle) return;
        editCycleDialog.open({ cycle: editedCycle });
    };

    const handleClickViewDrivers = useCallback(() => {
        window.open('/drivers', '_blank');
    }, []);

    const viewMoreCycles = useCallback(() => {
        window.open('/settings/settlements/cycles/', '_blank');
    }, []);

    const selectedCycle = useMemo(
        () => cycles.find((cycle) => cycle.cycleId === cycleId),
        [cycles, cycleId]
    );

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const renderInput = () => (
        <OutlinedInput
            label="Views"
            size="small"
            startAdornment={(
                <CyclesStyled.Box>
                    <SettlementsIcons.CycleIcon />
                </CyclesStyled.Box>
            )}
        />
    );

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Tab') {
            e.stopPropagation();
            e.preventDefault();
        }
    };

    const renderValue = () => (
        <Typography
            maxWidth={140}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
        >
            {selectedCycle?.name}
        </Typography>
    );

    const renderIconComponent = () => (
        <CyclesSelectIconComponent
            isLoading={isLoading}
            selectedCycle={selectedCycle}
            open={open}
            setOpen={setOpen}
            onViewDrivers={handleClickViewDrivers}
            onViewCycle={viewMoreCycles}
            onEdit={handleClickEdit}
        />
    );

    return (
        <CyclesStyled.FormControl>
            <InputLabel id="cycles-select-label">{t('fields:cycles.label')}</InputLabel>
            <Select
                labelId="cycles-select-label"
                label={t('fields:cycles.label')}
                IconComponent={renderIconComponent}
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                value={selectedCycle?.cycleId || ''}
                onKeyDown={handleKeyDown}
                input={renderInput()}
                renderValue={renderValue}
                sx={{
                    '&& .MuiSelect-select': {
                        minWidth    : '0rem !important',
                        paddingRight: '4px !important'
                    }
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            '.MuiList-root': {
                                padding: !cycles ? '8px 0' : '0'
                            }
                        }
                    }
                }}
            >
                <CyclesSelectList
                    cycles={cycles}
                    onViewDrivers={handleClickViewDrivers}
                    onViewCycle={viewMoreCycles}
                    onEdit={handleClickEdit}
                    onClose={handleClose}
                />
            </Select>
        </CyclesStyled.FormControl>
    );
}
