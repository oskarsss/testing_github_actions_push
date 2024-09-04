import { hookFabric } from '@/utils/dialog-hook-fabric';
import React from 'react';
import { useLoadboardSelectedSearchResultsMap } from '@/store/loadboard/selectors';
import { Box, Stack, IconButton } from '@mui/material';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import CloseIcon from '@mui/icons-material/Close';
import LoadboardMainInfo from './LoadboardMainInfo';

type Props = {
    resultIds: string[];
};

export const useCompareLoadsDialog = hookFabric(CompareLoads, (props) => (
    <DialogComponents.DialogWrapper
        padding="0px"
        maxWidth="1550px"
        turnOffCloseButton
        DialogProps={{
            PaperProps: {
                sx: {
                    maxWidth              : '1500px',
                    width                 : 'min-content !important',
                    backgroundColor       : 'transparent',
                    '&::-webkit-scrollbar': {
                        width  : '6px !important',
                        height : '6px !important',
                        opacity: ' 1 !important'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        cursor         : 'grab',
                        backgroundColor: (theme) =>
                            `${theme.palette.mode === 'light' ? '#D0D5DD' : '#535252'} !important`,
                        borderRadius: '16px !important',
                        width       : '4px !important'
                    }
                }
            }
        }}
        {...props}
    />
));

function CompareLoads({ resultIds }: Props) {
    const { map: loadsMap } = useLoadboardSelectedSearchResultsMap();
    return (
        <Stack
            direction="row"
            gap={2}
        >
            {resultIds.map((resultId) => (
                <Stack
                    key={resultId}
                    direction="column"
                    gap={2}
                    sx={{
                        position       : 'relative !important',
                        backgroundColor: (theme) => theme.palette.semantic.background.white
                    }}
                >
                    <Box
                        sx={{
                            zIndex  : 3000,
                            top     : 5,
                            right   : 5,
                            position: 'absolute'
                        }}
                    >
                        <IconButton
                            sx={{
                                backgroundColor: ({ palette }) => palette.semantic.background.white,
                                '&:hover'      : {
                                    backgroundColor: (theme) =>
                                        `${theme.palette.semantic.background.white} !important`
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <LoadboardMainInfo selectedLoad={loadsMap[resultId]} />
                </Stack>
            ))}
        </Stack>
    );
}

export default CompareLoads;
