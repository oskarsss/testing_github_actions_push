import SettingsEmptyScreen, { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import Box from '@mui/material/Box';
import React from 'react';
import { useAddCycleDialog } from '@/views/settings/tabs/Settlements/Cycles/dialogs/AddCycleDialog';
import { VIEW_NAME } from '@/views/settings/tabs/Settlements/Cycles/Cycles';

type NoCycleProps = {
    view_name: VIEW_NAME;
};

export default function NoCycle({ view_name }: NoCycleProps) {
    const addCycleDialog = useAddCycleDialog();
    const openAddCycleDialog = () => addCycleDialog.open({});

    return (
        <Box
            position="relative"
            minHeight="80vh"
        >
            <SettingsEmptyScreen
                type={
                    view_name === VIEW_NAME.ACTIVE
                        ? FallbackType.CYCLES_ACTIVE
                        : FallbackType.CYCLES_DEACTIVATED
                }
                onClickFallback={openAddCycleDialog}
            />
        </Box>
    );
}
