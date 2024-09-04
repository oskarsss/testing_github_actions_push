import { Divider, Stack } from '@mui/material';
import { UserTypeWithOnline } from '@/@core/components/notes/types';
import React, { memo } from 'react';
import StickyDriversItem from '@/@core/components/notes/components/StickyDrivers/StickyDriversItem';

type Props = {
    stickyDrivers: UserTypeWithOnline[];
};

function StickyDrivers({ stickyDrivers }: Props) {
    if (!stickyDrivers.length) return null;
    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            gap="4px"
            height="24px"
            paddingLeft="12px"
            width="100%"
            bgcolor={(theme) => theme.palette.semantic.foreground.white.primary}
            borderBottom={(theme) => `1px solid ${theme.palette.semantic.border.primary}`}
        >
            {stickyDrivers.map((driver, index) => (
                <React.Fragment key={driver.driverId}>
                    <StickyDriversItem
                        key={driver.driverId}
                        driver={driver}
                    />
                    {index !== stickyDrivers.length - 1 && (
                        <Divider
                            orientation="vertical"
                            sx={{
                                height     : '10px',
                                margin     : 0,
                                borderColor: (theme) => theme.palette.semantic.foreground.six
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
        </Stack>
    );
}

export default memo(StickyDrivers);
