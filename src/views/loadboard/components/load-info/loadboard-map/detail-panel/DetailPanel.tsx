import { Box, Stack, Typography } from '@mui/material';
import {
    LB_ListenSearchResultsReply_SearchResult_Destination,
    LB_ListenSearchResultsReply_SearchResult_Origin
} from '@proto/loadboard';
import { Measures_Distance } from '@proto/models/model_measures';
import moment from 'moment-timezone';
import React from 'react';

type Props = {
    origin?: LB_ListenSearchResultsReply_SearchResult_Origin;
    destination?: LB_ListenSearchResultsReply_SearchResult_Destination;
    distance?: Measures_Distance;
};

function DetailPanel({
    destination,
    distance,
    origin
}: Props) {
    const startAt = moment(origin?.startAt);
    const endAt = moment(destination?.startAt);

    return (
        <Stack
            direction="row"
            gap={2}
            justifyContent="space-between"
            sx={{
                position       : 'absolute',
                bottom         : 0,
                zIndex         : 100,
                padding        : '12px',
                width          : '100%',
                backgroundColor: (theme) => theme.palette.semantic.background.white
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                flex="3 1 100%"
            >
                <Typography
                    noWrap
                    textOverflow="ellipsis"
                    variant="body1"
                    maxWidth={100}
                    fontSize="16px"
                    fontWeight={500}
                    sx={{
                        color: (theme) => theme.palette.semantic.text.primary
                    }}
                    color="initial"
                >
                    {origin?.city}, {origin?.state}
                </Typography>

                <Typography
                    variant="body1"
                    color="initial"
                    sx={{
                        color: (theme) => theme.palette.semantic.text.secondary
                    }}
                >
                    {startAt.format('MMM D HH:mm')}
                </Typography>
            </Box>

            <Box
                display="flex"
                flex="1 2 100%"
                flexDirection="column"
                gap={1}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    width="fit-content"
                    padding="0px 4px"
                    gap={2}
                    sx={{
                        borderRadius   : '5px',
                        backgroundColor: (theme) => theme.palette.semantic.foreground.secondary
                    }}
                >
                    <Typography
                        variant="body1"
                        fontSize="16px"
                        fontWeight={500}
                        sx={{
                            color: (theme) => theme.palette.semantic.text.secondary
                        }}
                    >
                        MI
                    </Typography>
                    <Typography
                        variant="body1"
                        fontSize="16px"
                        fontWeight={500}
                        sx={{
                            color: (theme) => theme.palette.semantic.text.primary
                        }}
                        color="initial"
                    >
                        {distance?.miles || 0}
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    padding="0px 4px"
                    gap={2}
                    sx={{
                        borderRadius   : '5px',
                        backgroundColor: (theme) => theme.palette.semantic.foreground.secondary
                    }}
                >
                    <Typography
                        variant="body1"
                        fontSize="16px"
                        fontWeight={500}
                        sx={{
                            color: (theme) => theme.palette.semantic.text.secondary
                        }}
                    >
                        DH
                    </Typography>
                    <Typography
                        variant="body1"
                        fontSize="16px"
                        fontWeight={500}
                        sx={{
                            color: (theme) => theme.palette.semantic.text.primary
                        }}
                        color="initial"
                    >
                        {origin?.deadhead || 0}
                    </Typography>
                </Box>
            </Box>

            <Box
                display="flex"
                flex="3 1 100%"
                flexDirection="column"
            >
                <Typography
                    textAlign="right"
                    noWrap
                    maxWidth={100}
                    textOverflow="ellipsis"
                    variant="body1"
                    fontSize="16px"
                    fontWeight={500}
                    sx={{
                        color: (theme) => theme.palette.semantic.text.primary
                    }}
                    color="initial"
                >
                    {destination?.city}, {destination?.state}
                </Typography>

                <Typography
                    textAlign="right"
                    variant="body1"
                    color="initial"
                    sx={{
                        color: (theme) => theme.palette.semantic.text.secondary
                    }}
                >
                    {endAt.format('MMM D HH:mm')}
                </Typography>
            </Box>
        </Stack>
    );
}

export default DetailPanel;
