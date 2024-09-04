import { TrucksIcon } from '@/@core/icons/custom-nav-icons/icons';
import { Stack } from '@mui/material';
import React from 'react';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';

type Props = {
    truck_id: string;
};

function TruckCell({ truck_id }: Props) {
    const trucksMap = useTrucksMap();

    const truck = trucksMap[truck_id];
    return (
        <Stack
            direction="row"
            gap="4px"
            alignItems="center"
            flex="1 1 0"
            sx={{
                display       : 'flex',
                alignItems    : 'center',
                justifyContent: 'flex-start',
                fontWeight    : 500,
                color         : (theme) => theme.palette.semantic.foreground.brand.primary,
                svg           : {
                    fill      : (theme) => theme.palette.semantic.foreground.brand.primary,
                    width     : 20,
                    height    : 20,
                    flexShrink: 0
                }
            }}
        >
            {TrucksIcon()}
            {truck?.referenceId || '-'}
        </Stack>
    );
}

export default TruckCell;
